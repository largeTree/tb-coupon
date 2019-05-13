<template>
  <div class="coupon-item-content" @click="onTouch">
    <img class="coupon-img" :src="item.pictUrl" :data-src="item.pictUrl">
    <p class="title">{{item.title}}</p>
    <p class="icon-list">
      <span v-show="item.couponId" class="coupon-amount-tag p-icon">
        <span class="coupon-amount-price">{{item.couponAmount}}元</span>
      </span>
      <span v-show="item.userType == 1" class="tmall-icon p-icon"></span>
      <!-- <span class="postfee-icon p-icon">包邮</span> -->
    </p>

    <!-- 有优惠券的显示折后价和券后价 -->
    <p v-show="item.couponId" class="price-con">
      <del class="final-price">原价{{item.zkFinalPrice}}元</del>
      <span class="after-price">{{item.afterPrice || item.zkFinalPrice}}元</span>
    </p>

    <!-- 没有优惠券的，显示原价和现价 -->
    <p v-show="!item.couponId" class="price-con">
      <del class="final-price">一口价{{item.reservePrice}}元</del>
      <span class="after-price">{{item.afterPrice || item.zkFinalPrice}}元</span>
    </p>
    
    <p class="other-info">
      {{item.provcity}}
      <span class="fr">月销{{item.volume}}</span>
    </p>
  </div>
</template>
<script>
export default {
  name: "coupon-item",
  props: {
    item: Object,
    onItemClick: Function
  },
  methods: {
    onTouch() {
      if (this.onItemClick) {
        this.onItemClick(this.item);
      }
    }
  }
};
</script>
<style>
.coupon-item-content {
  height: 2rem;
  border-bottom: 1px solid #f0f1f2;
  padding: 0.24rem 0.24rem 0.24rem 2.44rem;
  position: relative;
  background: #fff;
  border-top: 1px solid #f0f1f2;
}
.coupon-img {
  border: 0 none;
  position: absolute;
  left: 0.24rem;
  top: 0.24rem;
  height: 2rem;
  width: 2rem;
}
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #333;
  font-size: 0.24rem;
  line-height: 0.36rem;
  height: 0.6rem;
  padding: 0 0 0.08rem;
}
.icon-list {
  display: block;
  margin-left: 0px;
}
.p-icon {
  font-size: 0.24rem;
  vertical-align: middle;
}
.tmall-icon {
  height: 0.32rem;
  width: 0.32rem;
  display: inline-block;
  background: url("../assets/icon/tmall_icon.png");
  background-size: cover;
}
.coupon-amount-tag {
  display: inline-block;
  background: url("../assets/coupon/coupon.png") no-repeat;
  background-size: 17px 16px;
  height: 16px;
  padding-left: 16px;
}
.coupon-amount-price {
  border: 1px solid #fe4800;
  border-left: none;
  line-height: 14px;
  height: 14px;
  overflow: hidden;
  display: block;
  padding: 0 2px;
  color: #fe4800;
  margin-bottom: -3px;
  font-size: 12px;
}
.postfee-icon {
  font-size: 0.26rem;
  color: #fff;
  background: #55ae95;
  border-radius: 0.04rem;
  border: 1px solid #55ae95;
  height: 0.32rem;
  line-height: 0.32rem;
  margin-top: 0.1rem;
  padding: 0 0.08rem;
}
.price-con {
  line-height: 0.5rem;
}
.final-price {
  color: #cccccc;
  font-size: 0.24rem;
}
.after-price {
  color: #f40;
  font-size: 0.36rem;
  font-weight: 700;
}
.other-info {
  color: #333;
  font-size: 0.24rem;
}
.fr {
  float: right;
}
</style>