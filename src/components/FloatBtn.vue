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
  bottom: 3.5rem;
  right: .5rem;
  border-radius: .2rem;
  padding: .2rem .2rem 0.1rem .2rem;
  transition: all 0.5s;
  -moz-transition: all 0.5s; /* Firefox 4 */
  -webkit-transition: all 0.5s; /* Safari and Chrome */
  -o-transition: all 0.5s; /* Opera */
  background: -webkit-radial-gradient(rgba(15, 15, 15, 0.5), rgb(248, 248, 248, 0.5)); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(rgb(15, 15, 15, 0.5), rgb(248, 248, 248, 0.5)); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(rgba(233, 229, 229, 0.5), rgb(248, 248, 248, 0.5)); /* Firefox 3.6 - 15 */
  background: radial-gradient(rgba(250, 247, 247, 0.5), rgba(138, 115, 115, 0.5)); /* 标准的语法 */
}
</style>