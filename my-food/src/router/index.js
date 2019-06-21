import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'

import App from '../App'

//路由懒加载
const Take= resolve =>require(['../page/home/Take'],resolve);
const Indent= resolve =>require(['../page/home/Indent'],resolve);
const Search= resolve =>require(['../page/home/Search'],resolve);
const User= resolve =>require(['../page/home/User'],resolve);
const City= resolve =>require(['../page/city/City'],resolve);
const Place= resolve =>require(['../page/city/Place'],resolve);
const Details= resolve =>require(['../page/details/Details'],resolve);
const Login= resolve =>require(['../page/login/Login'],resolve);
const Forget= resolve =>require(['../page/login/Forget.vue'],resolve);
const Info= resolve =>require(['../page/message/Info.vue'],resolve);
const Address= resolve =>require(['../page/message/Address.vue'],resolve);
const Add= resolve =>require(['../page/message/Add.vue'],resolve);
const AddDetail= resolve =>require(['../page/message/AddDetail.vue'],resolve);
const SetUsername= resolve =>require(['../page/message/SetUsername.vue'],resolve);
const Order= resolve =>require(['../page/details/Order'],resolve);

Vue.use(Router)

export default new Router({
  routes: [{
    path:"/",
    component: App,
    children:[
      {
        path:"",
        redirect:"/place"
      },
      {
        path: '/take/:geohash',
        name: 'take',
        component: Take
      },
      {
        path: '/search/:geohash',
        name: 'search',
        component: Search
      },
      {
        path: '/indent',
        name: 'indent',
        component: Indent
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/place',
        name: 'place',
        component: Place
      },
      {
        path: '/details/:geohash/:id',
        name: 'details',
        component: Details
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/city/:id',
        name: 'city',
        component: City
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/forget',
        name: 'forget',
        component: Forget
      },
      {
        path: '/user/info',
        name: 'info',
        component: Info
      },
      {
        path: '/user/info/address',
        name: 'address',
        component: Address
      },
      {
        path: '/user/info/setusername',
        name: 'setusername',
        component: SetUsername
      },
      {
        path: '/user/info/address/add',
        name: 'add',
        component: Add
      },
      {
        path: '/user/info/address/add/addDetail',
        name: 'addDetail',
        component: AddDetail
      }
    ]
  }]
})
