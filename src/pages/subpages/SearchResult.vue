<template>
    <div>
        <x-header :left-options="{preventGoBack:true}" @on-click-back="clickBack">
            {{title}}
        </x-header>
    </div>
</template>

<script>
import { HttpService } from '../../services/HttpService';
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
        
    }
}
</script>

<style>

</style>
