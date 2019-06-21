// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/index.js'
import FastClick from 'fastClick'
import './config/rem'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'	
Vue.use(Mint)


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI,{size:'small',zIndex:3000})

//全局注册axios
import axios from "axios"
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;

if('addEventListener' in document){
  document.addEventListener('DOMContentLoaded',function(){
    FastClick.attach(document.body);
  },false)
}
Vue.config.productionTip = false



new Vue({
  router,
  store,
}).$mount("#app")
