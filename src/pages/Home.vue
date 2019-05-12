<template>
  <div class="body">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <view-box :body-padding-top="46" :body-padding-bottom="50">
      <scroller
        ref="myscroller"
        style="bottom: 50px"
        height="90%"
        :on-refresh="refresh"
        :on-infinite="infinite"
      >
        <!-- 搜索框 -->
        <search
          placeholder="点击搜索优惠券"
          v-model="searchToken"
          position="static"
          :auto-fixed="false"
          ref="search"
          @on-submit="onSubmit"
        ></search>

        <!-- 滚动图 -->
        <!-- <swiper loop auto :list="swiperList"></swiper> -->

        <!-- <divider>券分类</divider> -->

        <!-- 九宫格 -->
        <!-- <grid :cols="4" class="spu-clz-grid">
          <grid-item :label="'九宫格'" v-for="i in 8" :key="i">
            <img slot="icon" src="../assets/vux_logo.png">
          </grid-item>
        </grid> -->

        <divider>精选券</divider>

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
import { Divider, Swiper, Search, Grid, GridItem, Card, XImg } from "vux";
import CouponItem from "../components/CouponItem";
import FloatBtn from "../components/FLoatBtn";
import { MyHttpService } from "../services/HttpService";
import NumberUtils from "../services/NumberUtils";
import { setTimeout } from "timers";

export default {
  components: {
    Search,
    Swiper,
    Grid,
    GridItem,
    Divider,
    Card,
    XImg,
    CouponItem,
    FloatBtn
  },
  data() {
    return {
      searchToken: "",
      swiperList: [],
      couponData: {
        rows: [],
        loading: false,
        hasMoreData: true
      }
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: "SearchResult",
        query: {
          q: this.searchToken
        }
      });
    },
    floatBtnClick() {
      // 这个组件似乎有问题，启用动画的情况下一定要有间隔的调用两次scorellTo，才滚动到指定位置
      this.$refs.myscroller.scrollTo(0, 0, true);
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(0, 0, true);
        console.log(this.$refs.myscroller.getPosition());
      }, 50);
    },
    loadCoupon(pageNo, pageSize) {
      pageNo = pageNo || 1;
      pageSize = pageSize || 20;
      this.couponData.loading = true;
      return MyHttpService.post("/api.do", {
        apiKey: "mp-common-call-tb-api",
        tbKey: "taobao.tbk.dg.material.optional",
        platform: "2",
        jsonParam: {
          q: "裙子",
          sort: "tk_total_commi_desc",
          pageNo: pageNo,
          pageSize: pageSize
        }
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
        var hasMoreData = true;
        if (this.couponData.hasMoreData) {
          hasMoreData = false;
        }
        setTimeout(() => {
          done(hasMoreData);
        });
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
    couponItemClick(couponItem) {
      this.$router.push({
        name: "CouponDetail",
        params: {
          couponData: couponItem
        }
      });
    }
  },
  deactivated() {
    this.lastPosition = this.$refs.myscroller.getPosition();
  },
  activated() {
    if (this.lastPosition) {
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(
          this.lastPosition.left,
          this.lastPosition.top,
          false
        );
      }, 10);
    }
  }
};
</script>

<style>
.body {
  height: 100%;
  background-color: #f0f0f0;
}
.spu-clz-grid {
  border-bottom: 1px #d9d9d9 solid;
}
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
