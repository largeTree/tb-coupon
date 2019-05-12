<template>
  <div class="body">
    <x-header
      :left-options="{preventGoBack:true}"
      @on-click-back="clickBack"
    >{{this.couponData.title}}</x-header>

    <!-- 商品图片滚动图 -->
    <swiper :aspect-ratio="0.6" v-if="loadFinish" loop auto :list="goodsInfo.swiperImgList"></swiper>
    <div class="item-det-info">
      <h3>{{this.goodsInfo.title}}</h3>
      <div class="shop-info">店铺:{{this.goodsInfo.nick}}</div>
      <div class="price-container">
        <div class="final-price">
          <del>原价￥{{this.goodsInfo.reservePrice}}</del>
          &nbsp;&nbsp;
          <del>现价￥{{this.goodsInfo.zkFinalPrice}}</del>
          &nbsp;&nbsp;
          用券后约
          <span>￥{{this.goodsInfo.afterPrice || this.goodsInfo.zkFinalPrice}}</span>
        </div>
      </div>
      <div class="vp-container">
        <div class="volume">月销量{{this.goodsInfo.volume}}件</div>
        <div class="provcity">{{this.goodsInfo.provcity}}</div>
      </div>
      <div class="coupon-info" v-show="couponData.couponId">
        <span>{{this.couponData.couponInfo}}券</span>
      </div>
    </div>
    <div class="bottom-btn" @click="getCouponPwd">
      <!-- show-loading -->
      <!-- <x-button type="warn" @click.native="getCouponPwd">立即领取</x-button> -->
      立即领取
    </div>
  </div>
</template>

<script>
import { Swiper, Divider, XButton } from "vux";
import { MyHttpService } from "../../services/HttpService";
import NumberUtils from "../../services/NumberUtils";

export default {
  name: "coupon-detail",
  components: { Swiper, Divider, XButton },
  data() {
    return {
      couponData: this.$route.params.couponData,
      goodsInfo: {
        swiperImgList: []
      },
      loadFinish: false
    };
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
    },
    loadItemData() {
      this.loadFinish = false;
      MyHttpService.doApi("mp-taobao-getTbkItemInfo", {
        platform: "2",
        numIid: this.couponData.numIid
      }).then(data => {
        this.goodsInfo = data.data;
        this.goodsInfo.swiperImgList = new Array();
        this.goodsInfo.swiperImgList.push({
          img: this.goodsInfo.pictUrl
        });
        if (this.goodsInfo.smallImages) {
          for (var sImg of this.goodsInfo.smallImages) {
            this.goodsInfo.swiperImgList.push({
              img: sImg
            });
          }
        }

        if (this.couponData.couponId) {
          this.goodsInfo.afterPrice = NumberUtils.sub(
            this.couponData.zkFinalPrice,
            this.couponData.couponAmount
          );
        }
        this.loadFinish = true;
      });
    },
    getCouponPwd() {
      var _this = this;
      var url;
      if (this.couponData.couponId) {
        url = this.couponData.couponShareUrl;
      } else {
        url = this.couponData.url;
      }
      if (url.startsWith("//")) {
        url = "https:" + url;
      }
      MyHttpService.doApi("mp-taobao-createPwd", {
        url: url,
        text: this.goodsInfo.title,
        logo: this.goodsInfo.pictUrl
      }).then(data => {
        var pwd = data.data.val;
        var content =
          _this.goodsInfo.title + "<br />" + _this.goodsInfo.nick + "<br />";
        if (_this.couponData.couponId) {
          content = content + _this.couponData.couponInfo + "<br />";
        }
        content =
          content + pwd + "<br />" + "复制这段文字，打开手机淘宝领取优惠券";
        this.$vux.confirm.show({
          title: "优惠券",
          content: content,
          confirmText: "复制",
          onConfirm() {
            var cpText = this.content.replace(/<br \/>/g, "\n");
            _this.$copyText(cpText).then(
              function(e) {
                _this.$vux.alert.show({
                  title: "提示",
                  content: "复制成功，请手动打开手机淘宝领取优惠券"
                });
              },
              function(e) {
                _this.$vux.alert.show({
                  title: "提示",
                  content: "复制失败，请手动长按优惠券信息，自行复制"
                });
              }
            );
          }
        });
      });
    }
  },
  created() {
    this.loadItemData();
  }
};
</script>

<style>
.body {
  height: 100%;
  background-color: #f0f0f0;
}
.item-det-info {
  padding: 1px 1em;
}
.shop-info {
  margin: 3px 0px;
}
.vp-container {
  overflow: hidden;
}
.volume {
  float: left;
}
.provcity {
  float: right;
}
.volume,
.provcity {
  color: #cccccc;
}
.price-container {
  margin-top: 2px 0px;
  font-size: 14px;
  color: #cccccc;
  overflow: hidden;
}
.final-price {
  float: left;
}
.final-price span {
  color: red;
  font-size: 20px;
}
.coupon-info {
  letter-spacing: 3px;
  text-align: center;
  font-size: 20px;
  margin: 10px 0px;
  background-color: #ffa500;
  border-radius: 0px 21px;
  padding: 5px 0px;
}
.coupon-info span {
  color: #ffffff;
}
.bottom-btn {
  bottom: 0px;
  position: absolute;
  width: 100%;
  height: 42px;
  line-height: 42px;
  color: #ffffff;
  background-color: #ff3030;
  text-align: center;
  letter-spacing: 3px;
  font-size: 18px;
}
</style>