<template>
  <div>
    <x-header :left-options="{showBack: false}">
      首页
    </x-header>
    <search
      placeholder="点击搜索优惠券"
      v-model="searchToken"
      top="46px"
      ref="search"
      @on-submit="onSubmit"></search>
  </div>
</template>

<script>
import {Search} from 'vux'
export default {
  data () {
    return {
      searchToken : ''
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
    Search
  }
}
</script>

<style>

</style>
