// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'

import { AjaxPlugin, XHeader, ViewBox  } from 'vux'

import Home from './components/Home'
import Recommend from './components/Recommend'
import Mine from './components/Mine'
import SearchResult from './components/subpages/SearchResult'

Vue.use(VueRouter)
Vue.use(AjaxPlugin)
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