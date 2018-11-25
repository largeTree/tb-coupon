<template>
    <div>
        <x-header :left-options="{preventGoBack:true}" @on-click-back="clickBack">
            {{title}}
        </x-header>
    </div>
</template>

<script>
import HttpService from '../../javascripts/HttpService';
export default {
    data () {
        return {
            title : '标题'
        }
    },
    methods : {
        clickBack : function(){
            this.$router.go(-1);
        }
    },
    created : function() {
        HttpService.post('api/searchresult/bySearchId?searchId=' + this.$route.query.id, {
            pageNo:1,
            pageSize:20
        }).then(function(data){
            console.log(data);
        });
    }
}
</script>

<style>

</style>
