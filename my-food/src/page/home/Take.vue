<template>
  <div class="take">
     <Load v-if="num !== 1"></Load>

     <head-top :headTitle="geohash.name" :goback="false" :signinUp="true" >
        <router-link tag="span" slot="logo" class="head_logo" :to="'/search/'+$route.params.geohash"><i class="fa fa-fw fa-search"></i></router-link>
     </head-top>
    <div class="center1">

      <!-- 轮播渲染 -->
      <div class="ul swiper-container" v-if="flags.length">
        <div class="swiper-wrapper" >
          <div class="swiper-slide"  v-for="item in flags" :key="item.id">
            <ul>
              <router-link tag="li" to="/" v-for="i in item" :key="i.id">
                <img :src="'https://fuss10.elemecdn.com'+i.image_url" >
                <p>{{i.title}}</p>
              </router-link>
            </ul>
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
      <ul v-else class="animation_opactiy">
          <li class="list_back_li" v-for="item in 1" :key="item">
            <img src="../../images/fl.svg" class="list_back_svg">
          </li>
      </ul>
      
      <p><img src="../../images/11.png" ><span>附近商家</span></p>
      
      <!-- 列表渲染 -->
      <con-tent></con-tent>

    </div>
    <!-- 底部 -->
    <foot-bottom></foot-bottom>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import footBottom from '../../components/footer/ComFooter'
import conTent from '../../components/content'
import Swiper from 'swiper'
import swiper from '../../style/swiper.min.css'
import swiperr from '../../config/swiper.min.js'
import Load from "../../components/animeta";
export default {
  components:{
    headTop,
    footBottom,
    conTent,
    Load
  },
  data(){
    return{
      flags:[],
      geohash:"",
      num: 1,
    }
  },
  methods: {
    handleChange(index) {

    }
  },
  mounted(){
    this.num = this.num - 1;
    this.axios
    .get('http://elm.cangdu.org/v2/index_entry?geohash='+this.$route.params.geohash+'&group_type=1&flags')
    .then(res=>{
      if(res.data){
        let len=res.data.length;
        let resArr=res.data;
        let foodArr=[]
        for(let i=0,j=0;i<len;i+=8,j++){
          foodArr[j]=resArr.splice(0,8);
        }
        this.flags=foodArr
      }
    })
    .then(()=>{
      new Swiper('.swiper-container',{
        pagination:{
          el:".swiper-pagination"
          },
        autoplay:true,
        loop:true,
        autoplay:{
          delay:2000,
        }
      })
    })
    

    this.axios
    .get('http://elm.cangdu.org/v2/pois/'+this.$route.params.geohash)
    .then(res=>{
      if(res.data){
        this.geohash=res.data
        this.num = this.num + 1;
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .take{
    background-color: #F5F5F5;
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    .center1{
      flex:1;
      overflow: auto;
      width:100%;
      .ul{
        width:100%;
        height:3.5rem;
        .swiper-wrapper{
          width:100%;
          .swiper-slide{
            width:100%;
          }
        }
        ul{
          background-color: #fff;
          width:100%;
          height:3.5rem;
          padding: 0.1rem 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          font-size:0.22rem;
          color:#727272;
          li{
            flex:25%;
            text-align: center;
            img{
              width:0.8rem;
              height:0.8rem;
            }
          }
        }
      }
      
      &>p{
        margin-top: 0.2rem;
        width:100%;
        display: flex;
        background-color: #fff;
        font-size: 0.23rem;
        color:#999999;
        line-height: 0.45rem;
        padding: 0 0 0.1rem 0;
        img{
          width:0.4rem;
          height:0.45rem;
        }
      }
      
    }
  }
</style>
