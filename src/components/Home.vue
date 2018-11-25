<template>
  <div style="height:100%">
    <x-header :left-options="{showBack: false}">
      首页
    </x-header>
    <view-box :body-padding-top="46" :body-padding-bottom="50">
      <!-- 搜索框 -->
      <search
        placeholder="点击搜索优惠券"
        v-model="searchToken"
        position="static"
        :auto-fixed=false
        top="46px"
        ref="search"
        @on-submit="onSubmit"></search>
      
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
      <grid :cols="2" class="spu-clz-grid">
        <grid-item :label="'九宫格'" v-for="i in 8" :key="i">
          <img slot="icon" src="../assets/vux_logo.png">
          很大的
          <br />
          啊啊啊
        </grid-item>
      </grid>
    </view-box>
  </div>
</template>

<script>
import { Divider, Swiper, Search, Grid, GridItem } from 'vux'

/** 滚动图配置 */
const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw50iwj20ff0aaaci.jpg', // 404
  title: '送你一次旅行'
  // fallbackImg: '' // 代替图片
}]

export default {
  data () {
    return {
      searchToken : '',
      swiperList : baseList
    }
  },
  methods : {
    onSubmit () {
      this.$router.push({
        name:'SearchResult',
        params:{
          searchToken:this.searchToken
        }
      });
    }
  },
  components : {
    Search, Swiper, Grid, GridItem, Divider
  }
}
</script>

<style>
.spu-clz-grid {
  border-bottom: 1px #D9D9D9 solid;
}
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
