<template>
  <div class="body">
    <x-header :left-options="{showBack: false}">小瓶子</x-header>
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

        <!-- 广告条 -->
        <advbar msg="点击关注不迷路" :click="showQrCode"></advbar>
        <!-- 滚动图 -->
        <!-- <swiper loop auto :list="swiperList"></swiper> -->

        <divider>券分类</divider>

        <!-- 九宫格 -->
        <grid :cols="4" class="spu-clz-grid">
          <grid-item
            :label="item.name"
            v-for="item in catList"
            :key="item.id"
            :link="'/searchresult?t=c&amp;q=' + item.id + '&amp;c_name=' + item.name"
            class="spu-clz-item"
          >
            <img slot="icon" :src="item.icon">
          </grid-item>
        </grid>

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
    <div v-transfer-dom>
      <alert v-model="showQrCodeAlert" title="关注公众号"><img width="70%" height="70%" src="../assets/qrCode_8cm.jpg" /></alert>
    </div>
  </div>
</template>

<script>
import { Divider, Swiper, Search, Grid, GridItem, Card, XImg, Alert, TransferDomDirective as TransferDom } from "vux";
import CouponItem from "../components/CouponItem";
import FloatBtn from "../components/FLoatBtn";
import Advbar from "../components/Advbar";
import { MyHttpService } from "../services/HttpService";
import NumberUtils from "../services/NumberUtils";
import { setTimeout, setInterval } from "timers";

let _catList = [
  {
    id: "16",
    name: "女装",
    icon: "./static/cats_icon/w_wear.jpg"
  },
  {
    id: "50006843",
    name: "女鞋",
    icon: "./static/cats_icon/w_shose.jpg"
  },
  {
    id: "50010788",
    name: "彩妆",
    icon: "./static/cats_icon/cosmetics.jpg"
  },
  {
    id: "30",
    name: "男装",
    icon: "./static/cats_icon/m_wear.jpg"
  },
  {
    id: "50011740",
    name: "流行男鞋",
    icon: "./static/cats_icon/m_shose.jpg"
  },
  {
    id: "11",
    name: "电脑硬件",
    icon: "./static/cats_icon/computer.jpg"
  },
  {
    id: "50002766",
    name: "零食特产",
    icon: "./static/cats_icon/snacks.jpg"
  },
  {
    id: "50013886",
    name: "户外专区",
    icon: "./static/cats_icon/outdoors.jpg"
  }
];

export default {
  directives: {
    TransferDom
  },
  components: {
    Search,
    Swiper,
    Grid,
    GridItem,
    Divider,
    Card,
    XImg,
    CouponItem,
    FloatBtn,
    Advbar,
    Alert
  },
  data() {
    return {
      searchToken: "",
      swiperList: [],
      couponData: {
        rows: [],
        loading: false,
        hasMoreData: true
      },
      catList: _catList,
      showQrCodeAlert: false
    };
  },
  methods: {
    showQrCode() {
      this.showQrCodeAlert = true;
    },
    catItemClick(catItem) {
      console.log(catItem);
    },
    onSubmit() {
      this.$router.push({
        name: "SearchResult",
        query: {
          q: this.searchToken,
          t: "q"
        }
      });
    },
    floatBtnClick() {
      // 这个组件似乎有问题，启用动画的情况下一定要先等到动画完全停止之后才能滚动到指定位置，先设置一次使动画停止，再滚动到指定位置
      this.$refs.myscroller.scrollTo(0, 0, true);
      setTimeout(() => {
        this.$refs.myscroller.scrollTo(0, 0, true);
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
          q: "ins 女装 裙子 仙女",
          sort: "tk_total_commi_desc",
          hasCoupon: "true",
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
              row.shopDsr = (row.shopDsr / 10000).toFixed(2);
              row.remainCount = Math.ceil(
                NumberUtils.div(row.couponRemainCount, 100)
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
    this.searchToken = "";
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
  background: #f5f5f5;
  font-size: 14px;
  line-height: 1.8;
}
.spu-clz-grid {
  border-bottom: 1px #d9d9d9 solid;
}
.spu-clz-item {
  background-color: #ffffff;
}
</style>
