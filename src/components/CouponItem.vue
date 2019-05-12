<template>
  <div class="coupon-item-content" @click="onTouch">
    <div v-if="item.pictUrl" class="coupon-img-container">
      <img :src="item.pictUrl" class="coupon-img">
    </div>
    <div>
      <nobr>
        <h4 class="coupon-title">{{item.title}}</h4>
      </nobr>
      <span class="coupon-label" v-show="this.item.couponId" >{{item.couponInfo}}</span>
      <span class="coupon-price">
        到手约
        <span>￥{{item.afterPrice || item.zkFinalPrice}}</span>
      </span>
    </div>
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
  border-radius: 5px;
  background-color: #ffffff;
  position: relative;
  overflow: hidden;
  width: 92%;
  margin: 0 auto;
  margin-top: 5px;
  padding: 0.5em;
}
.coupon-img-container {
  float: left;
}
.coupon-img {
  width: 5em;
  display: block;
  margin-right: 5px;
}
.coupon-title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coupon-label {
  color: red;
  font-size: 0.5em;
  font-weight: 500;
  background-color: #ffe4e1;
  padding: 2px 5px;
  border-radius: 5px;
}
.coupon-price {
  display: block;
  color: #bdbdbd;
  font-size: 12px;
  margin-top: 5px;
}
.coupon-price span {
  color: red;
  font-size: 14px;
}
</style>
