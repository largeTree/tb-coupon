<template>
  <div>
    <div ref="advbar" class="adv-bar" @click="_click">{{msg}}</div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  name: "adv-bar",
  props: {
    msg: "",
    stemp: {
      type: Number,
      default: 20
    },
    click: Function
  },
  data() {
    return {
      started: false
    };
  },
  methods: {
    _click($event) {
      if (this.click) {
        this.click($event);
      }
    }
  },
  activated() {
    var _this = this;
    if (this.started) {
      return;
    } else {
      this.started = true;
    }
    setTimeout(() => {
      var left = 0;
      var right = 0;
      var act = true;
      var act2 = false;
      setInterval(() => {
        if (act) {
          if (right > 0) {
            right--;
          } else {
            left++;
          }
        } else {
          if (left > 0) {
            left--;
          } else {
            right++;
          }
        }
        if (act2) {
          _this.$refs.advbar.style.paddingLeft = left + "px";
          _this.$refs.advbar.style.paddingRight = right + "px";
        } else {
          _this.$refs.advbar.style.paddingLeft = left + "px";
          _this.$refs.advbar.style.paddingRight = right + "px";
        }
        if (left > 150) {
          act = false;
        } else if (right > 150) {
          act = true;
        }
      }, _this.stemp);
    }, 500);
  }
};
</script>

<style lang="" scoped>
.adv-bar {
  background-color: #f39d1d;
  color: #ffffff;
  text-align: center;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  letter-spacing: 2px;
}
</style>