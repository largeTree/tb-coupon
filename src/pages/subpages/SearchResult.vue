<template>
  <div class="body">
    <x-header :left-options="{preventGoBack:true}" @on-click-back="clickBack">{{title || '标题'}}</x-header>
    <view-box :body-padding-top="46" :body-padding-bottom="50">
      <scroller
        ref="myscroller"
        style="bottom: 50px"
        height="90%"
        :on-refresh="refresh"
        :on-infinite="infinite"
      >
        <coupon-item
          :item="item"
          v-for="item in couponData.rows"
          :key="item._idx"
          :on-item-click="couponItemClick"
        ></coupon-item>
      </scroller>
      <float-btn :on-click="floatBtnClick"></float-btn>
    </view-box>
  </div>
</template>

<script>
import CouponItem from "../../components/CouponItem";
import { MyHttpService } from "../../services/HttpService";
import NumberUtils from "../../services/NumberUtils";
import FloatBtn from "../../components/FLoatBtn";

export default {
  components: {
    CouponItem,
    FloatBtn
  },
  data() {
    return {
      title: "",
      searchType: "q",
      searchToken: "",
      cat_id: "",
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
      this.$router.push({
        path: "/"
      });
    },
    floatBtnClick() {
      // 这个组件似乎有问题，启用动画的情况下一定要先等到动画完全停止之后才能滚动到指定位置，先设置一次使动画停止，再滚动到指定位置
      this.$refs.myscroller.scrollTo(0, 0, true);
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(0, 0, true);
        console.log(this.$refs.myscroller.getPosition());
      }, 50);
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
      let jsonParam = {
        sort: "tk_total_commi_desc",
        hasCoupon: "true",
        pageNo: pageNo,
        pageSize: pageSize
      };
      if (this.searchType == "q") {
        jsonParam.q = this.searchToken;
      } else {
        jsonParam.cat = this.searchToken;
      }
      return MyHttpService.post("/api.do", {
        apiKey: "mp-common-call-tb-api",
        tbKey: "taobao.tbk.dg.material.optional",
        platform: "2",
        jsonParam: jsonParam
      }).then(
        data => {
          if (pageNo == 1) {
            this.couponData.rows = [];
          }
          data = data.data;
          var idx = this.couponData.rows.length;
          for (var i = 0; i < data.rows.length; i++) {
            var row = data.rows[i];
            if (row.couponId) {
              row.afterPrice = NumberUtils.sub(
                row.zkFinalPrice,
                row.couponAmount
              );
            }
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
    },
    setTitle() {
      let t = this.$route.query.t;
      if (!t || t == null) {
        t = "q";
      }
      if (t == "q") {
        this.title = this.$route.query.q;
      } else if (t == "c") {
        this.title = this.$route.query.c_name;
      }
    }
  },
  activated() {
    // 设置标题
    this.setTitle();
    
    // 刷新数据
    let t = this.$route.query.t;
    let q = this.$route.query.q;
    if (!t || t == null) {
      t = "q";
    }
    if (!q || q == null) {
      this.clickBack();
    }
    if (q !== this.searchToken || t !== this.searchType) {
      this.searchToken = q;
      this.searchType = t;
      // 判断一下q是否发生变更，如有变更，清理数据，重新加载
      this.couponData.rows = [];
      // 加载优惠券
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
