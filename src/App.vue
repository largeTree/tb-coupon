<template>
  <div id="app" style="height:100%">
    <router-view></router-view>
    <tabbar v-if="showTabbar">
      <tabbar-item selected link="/">
        <img slot="icon" src="./assets/logo.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/tabs/recommend">
        <img slot="icon" src="./assets/logo.png">
        <span slot="label">推荐</span>
      </tabbar-item>
      <tabbar-item link="/tabs/mine">
        <img slot="icon" src="./assets/logo.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      showTabbar: true
    }
  },
  methods: {
    refershTabbar: function() {
      if (this.$route.name.indexOf('tabs') == -1) {
        this.showTabbar = false
      } else {
        this.showTabbar = true
      }
    }
  },
  created: function() {
    this.refershTabbar()
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.refershTabbar()
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
