<template>
  <div class="body">
    <x-header :left-options="{preventGoBack:true}" @on-click-back="clickBack">{{title}}</x-header>
    <view-box :body-padding-top="46" :body-padding-bottom="50">
      <scroller ref="myscroller" style="bottom: 50px" height="90%" :on-refresh="refresh" :on-infinite="infinite">
        <coupon-item
          :item="item"
          v-for="item in couponData.rows"
          :key="item._idx"
          :on-item-click="couponItemClick"
        ></coupon-item>
      </scroller>
    </view-box>
  </div>
</template>

<script>
import CouponItem from "../../components/CouponItem";
import { MyHttpService } from "../../services/HttpService";
export default {
  components: {
    CouponItem
  },
  data() {
    return {
      title: "标题",
      couponData: {
        rows: [],
        maxPageNo: null,
        loading: false,
        hasMoreData: true
      }
    };
  },
  methods: {
    clickBack: function() {
      this.$router.go(-1);
    },
    couponItemClick(itemData) {
      this.$router.push({
        name: "CouponDetail",
        params: {
          couponData: itemData
        }
      });
    },
    loadCoupon(pageNo, pageSize) {
      pageNo = pageNo || 1;
      pageSize = pageSize || 20;
      this.couponData.loading = true;
      return MyHttpService.post("/api.do", {
        apiKey: "mp-taobao-findCoupon",
        q: this.title,
        pageNo: pageNo,
        pageSize: pageSize
      }).then(
        data => {
          if (pageNo == 1) {
            this.couponData.rows = [];
          }
          data = data.data;
          var idx = this.couponData.rows.length;
          for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows[i];
            row._idx = idx + i;
            this.couponData.rows.push(row);
          }
          this.couponData.pageNo = pageNo;
          this.couponData.pageSize = pageSize;
          this.couponData.maxPageNo = Math.ceil(
            data.total / this.couponData.pageSize
          );
          this.couponData.loading = false;
          this.couponData.hasMoreData =
            this.couponData.pageNo < this.couponData.maxPageNo;
          return this.couponData.hasMoreData;
        },
        error => {
          console.error(error);
          this.couponData.loading = false;
        }
      );
    },
    refresh(done) {
      if (this.couponData.loading) {
        setTimeout(() => {
          done();
        });
        return;
      }
      this.couponData.rows = [];
      this.loadCoupon(1, 20).then(data => {
        setTimeout(() => {
          done();
        });
      });
    },
    infinite(done) {
      if (this.couponData.loading || !this.couponData.hasMoreData) {
        if (this.couponData.hasMoreData) {
          setTimeout(() => {
            done();
          });
        } else {
          setTimeout(() => {
            done(true);
          });
        }
        return;
      }
      this.loadCoupon(
        this.couponData.pageNo + 1,
        this.couponData.pageSize
      ).then(hasMoreData => {
        setTimeout(() => {
          done(!hasMoreData);
        });
      });
    }
  },
  created: function() {
    if (this.$route.params.searchToken) {
      this.title = this.$route.params.searchToken;
    }
  },
  activated() {
    // 判断一下searchToken是否发生变更，如有变更，清理数据，重新加载
    if (this.$route.params.searchToken && this.$route.params.searchToken !== this.title) {
      this.couponData.rows = [];
      this.title = this.$route.params.searchToken;
      this.loadCoupon(1, 20);
    }
    if (this.lastPosition) {
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(
          this.lastPosition.left,
          this.lastPosition.top,
          false
        );
      }, 10);
    }
  },
  deactivated() {
    this.lastPosition = this.$refs.myscroller.getPosition();
  }
};
</script>

<style>
.body {
  height: 100%;
  background-color: #f0f0f0;
}
</style>
