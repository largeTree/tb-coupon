<template>
  <div class="body">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <view-box :body-padding-top="46" :body-padding-bottom="50">
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
      <swiper loop auto :list="swiperList"></swiper>

      <divider>商品分类</divider>

      <!-- 九宫格 -->
      <grid :cols="4" class="spu-clz-grid">
        <grid-item :label="'九宫格'" v-for="i in 8" :key="i">
          <img slot="icon" src="../assets/vux_logo.png">
        </grid-item>
      </grid>

      <divider>精选商品</divider>

      <coupon-item :item="item" v-for="item in couponData.rows" :key="item.numIid"></coupon-item>

      <!-- 
      <card v-for="item in couponData.rows" :key="item.numIid" class="spu-item-card">
        <div slot="content" class="spu-item-content">
          <x-img :src="item.pictUrl" :webp-src="item.pictUrl" class="spu-item-img" offset="100"></x-img>
          <div>
            {{item.title}}
          </div>
        </div>
      </card>-->
    </view-box>
  </div>
</template>

<script>
import { Divider, Swiper, Search, Grid, GridItem, Card, XImg } from "vux";
import CouponItem from "../components/CouponItem";
import HttpService from "../services/HttpService";

/** 滚动图配置 */
const baseList = [
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg",
    title: "送你一朵fua"
  },
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg",
    title: "送你一辆车"
  },
  {
    url: "javascript:",
    img: "https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg", // 404
    title: "送你一次旅行"
    // fallbackImg: '' // 代替图片
  }
];

export default {
  data() {
    return {
      searchToken: "",
      swiperList: baseList,
      couponData: {}
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({
        name: "SearchResult",
        params: {
          searchToken: this.searchToken
        }
      });
    },
    onSpuImgError() {}
  },
  created() {
    HttpService.post("/api.do", {
      apiKey: "mp-taobao-findCoupon",
      q: "连衣裙"
    }).then(
      data => {
        this.couponData = data.data;
      },
      error => {
        console.error(error);
      }
    );
  },
  components: {
    Search,
    Swiper,
    Grid,
    GridItem,
    Divider,
    Card,
    XImg,
    CouponItem
  }
};
</script>

<style>
.body {
  height: 100%;
  background-color: #F8F8FF;
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
