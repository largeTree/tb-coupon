// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

import { AjaxPlugin, XHeader, ViewBox, ConfirmPlugin, AlertPlugin } from 'vux'
import VueScroller from 'vue-scroller'
import VueClipboard from 'vue-clipboard2'

import Home from './pages/Home'
import Recommend from './pages/Recommend'
import Mine from './pages/Mine'
import SearchResult from './pages/subpages/SearchResult'
import CouponDetail from './pages/subpages/CouponDetail'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)
Vue.use(VueScroller)
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard)
Vue.component('x-header', XHeader)
Vue.component('view-box', ViewBox)


const routes = [{
    name: 'tabs.Home',
    path: '/',
    component: Home
}, {
    name: 'tabs.Recommend',
    path: '/tabs/recommend',
    component: Recommend
}, {
    name: 'tabs.Mine',
    path: '/tabs/mine',
    component: Mine
}, {
    name: 'SearchResult',
    path: '/searchresult',
    component: SearchResult
}, {
    name: 'CouponDetail',
    path: '/coupondetail',
    component: CouponDetail
}]

const router = new VueRouter({
    routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app-box')