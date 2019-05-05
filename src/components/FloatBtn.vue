<template>
  <div class="float-btn" v-show="isShow" @click="_onClick">
    <x-icon type="android-arrow-up" size="30"></x-icon>
  </div>
</template>

<script>
export default {
  name: "float-btn",
  props: {
    onClick: Function,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    _onClick($event) {
      if (this.onClick) {
        this.onClick($event);
      }
    }
  }
};
</script>

<style lang="" scoped>
.float-btn {
  z-index: 99999;
  position: absolute;
  bottom: 180px;
  right: 25px;
  background: red;
  border-radius: 15px;
  padding: 8px 12px;
  box-shadow: 2px 2px 5px #333333;
  -moz-box-shadow: 2px 2px 5px #333333;
  -webkit-box-shadow: 2px 2px 5px #333333;
  transition: all 0.5s;
  -moz-transition: all 0.5s; /* Firefox 4 */
  -webkit-transition: all 0.5s; /* Safari and Chrome */
  -o-transition: all 0.5s; /* Opera */
  background: -webkit-radial-gradient(rgb(170, 163, 163, 0.5), rgb(248, 248, 248)); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(rgb(170, 163, 163, 0.5), rgb(248, 248, 248)); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(rgb(170, 163, 163, 0.5), rgb(248, 248, 248)); /* Firefox 3.6 - 15 */
  background: radial-gradient(rgb(170, 163, 163, 0.5), rgb(248, 248, 248)); /* 标准的语法 */
}
</style>