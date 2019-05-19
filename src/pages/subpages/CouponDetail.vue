<template>
  <div class="body">
    <x-header
      :left-options="{preventGoBack:true}"
      @on-click-back="clickBack"
    >{{this.couponData.title}}</x-header>

    <view-box :body-padding-top="46" :body-padding-bottom="50">
      <scroller ref="myscroller" height="85%">
        <!-- 商品图片滚动图 -->
        <swiper :aspect-ratio="1" v-if="loadFinish" loop auto :list="this.couponData.swiperImgList"></swiper>
        <div class="item-det-info">
          <p class="det-item-title">{{this.couponData.title}}</p>
          <div class="price-container">
            <!-- 优惠券天猫图标 -->
            <p class="icon-list">
              <span v-show="this.couponData.couponId" class="det-coupon-amount-tag p-icon">
                <span class="det-coupon-amount-price">{{this.couponData.couponAmount}}元</span>
              </span>
              <span v-show="this.couponData.userType == 1" class="det-tmall-icon p-icon"></span>
              <!-- <span class="postfee-icon p-icon">包邮</span> -->
            </p>
            <div v-show="!this.couponData.couponId" class="final-price">
              <del>原价￥{{this.couponData.reservePrice}}</del>
              &nbsp;&nbsp;
              现价
              <span>￥{{this.couponData.afterPrice || this.couponData.zkFinalPrice}}</span>
            </div>

            <div v-show="this.couponData.couponId" class="final-price">
              <del>原价￥{{this.couponData.zkFinalPrice}}</del>
              &nbsp;&nbsp;
              用券后约
              <span>￥{{this.couponData.afterPrice || this.couponData.zkFinalPrice}}</span>
            </div>
          </div>
          <div class="det-other-info">
            <p>券有效期：{{this.couponData.couponStartTime}} / {{this.couponData.couponEndTime}}</p>
            <p>券剩余：{{this.couponData.couponRemainCount}}/{{this.couponData.couponTotalCount}}</p>
            <p class="det-float-right">店铺评分：{{this.couponData.shopDsr}}</p>
            <p>店铺：{{this.couponData.nick}}</p>
            <p class="det-float-right">{{this.couponData.provcity}}</p>
            <p>月销量{{this.couponData.volume}}件</p>
          </div>
        </div>
      </scroller>
    </view-box>
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
      this.couponData.swiperImgList = [];
      // 商品主图
      this.couponData.swiperImgList.push({
        img: this.couponData.pictUrl
      });
      if (this.couponData.smallImages) {
        // 小图列表
        for (var sImg of this.couponData.smallImages) {
          this.couponData.swiperImgList.push({
            img: sImg
          });
        }
      }
      this.loadFinish = true;
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
        text: this.couponData.title,
        logo: this.couponData.pictUrl
      }).then(data => {
        var pwd = data.data.val;
        var content =
          _this.couponData.title + "<br />" + _this.couponData.nick + "<br />";
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
    if (!this.couponData) {
      this.$router.push({
        path: "/"
      });
    }
  },
  mounted() {
    this.loadItemData();
  }
};
</script>

<style>
.det-item-title {
  margin: 0.2rem 0px;
  line-height: 1.5em;
  font-weight: 600;
}
.body {
  height: 100%;
  background-color: #f5f5f5;
}
.item-det-info {
  padding: 1px 1em;
}
.det-other-info {
  overflow: hidden;
  background-color: #ffffff;
  padding: 0.2rem;
  border-radius: 0.1rem;
}
.det-float-right {
  float: right;
}
.price-container {
  margin: 2px 0px;
  border-radius: 0.1rem;
  padding: 0.1rem 0px 0px 0.2rem;
  font-size: 14px;
  overflow: hidden;
  background-color: #ffffff;
}
.price-container del {
  color: #cccccc;
}
.final-price {
  float: left;
}
.final-price span {
  color: red;
  font-size: 20px;
}
.det-coupon-amount-tag {
  display: inline-block;
  background: url("../../assets/coupon/coupon.png") no-repeat;
  background-size: 21px 20px;
  height: 20px;
  padding-left: 20px;
}
.det-coupon-amount-price {
  border: 1px solid #fe4800;
  border-left: none;
  line-height: 18px;
  height: 18px;
  overflow: hidden;
  display: block;
  padding: 0 2px;
  color: #fe4800;
  margin-bottom: -3px;
  font-size: 12px;
}
.det-tmall-icon {
  height: 0.4rem;
  width: 0.4rem;
  display: inline-block;
  background: url("../../assets/icon/tmall_icon.png");
  background-size: cover;
}
.bottom-btn {
  bottom: 0px;
  position: absolute;
  width: 100%;
  height: 0.9rem;
  line-height: 0.9rem;
  color: #ffffff;
  background-color: #ff3030;
  text-align: center;
  letter-spacing: 3px;
  font-size: 18px;
}
</style>