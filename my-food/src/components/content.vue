<template>
  <div class="bbb">
    <div class="ccc" ref="wrapper" >
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill">
        <ul v-if="foodList.length" class="mui-table-view mui-grid-view">
            <li   v-for="(item,index) in foodList" :key="index">   

                <router-link tag="dl" :to="'/details/'+$route.params.geohash+'/'+item.id" class="mui-table-view-cell mui-media mui-col-xs-6" >                 
                    <dt  class="mui-media-body">
                        <img :src="'https://elm.cangdu.org/img/'+item.image_path" >
                    </dt>
                    <dd  class="mui-media-body">
                        <p class="p1"><span v-if="item.is_premium" class="span1">品牌</span><span class="name">{{item.name}}</span> <span class="span2" v-if="item.is_new"><span>保</span><span>准</span><span>票</span></span></p>
                        <p class="p2">
                          <a href="#">
                            <span class="star">
                                <span class="xing" v-bind:style="{'width':`${100*item.rating/5}%`}"></span>
                            </span>
                          {{item.rating}}</a>
                          <span class="mon">月售{{item.recent_order_num}}单</span> <span v-if="item.delivery_mode"  class="span3">{{item.delivery_mode.text}}</span> <span  class="span4" >准时达</span></p>
                        <p class="p3">￥<span>{{item.float_minimum_order_amount}}</span>起送/配送费约￥<span>{{item.float_delivery_fee}}</span><span>{{item.distance}}</span>/<span>{{item.order_lead_time}}</span></p>
                    </dd>
                </router-link>

            </li>
        </ul>
        <ul v-else class="animation_opactiy">
          <li class="list_back_li" v-for="item in 10" :key="item">
            <img src="../images/shopback.svg" class="list_back_svg">
          </li>
        </ul>
        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-if="show">loading...</span>
          <span v-else>没有数据了</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui';
export default {

  data() {
    return {
      foodList: [],
      //可以进行上拉
      allLoaded: false,
      //是否自动触发上拉函数
      isAutoFill: false,
      show:true,
      n: 0
    };
  },
  created() {
    this.loadFrist();
  },
  mounted() {
//刚进入显示的数据
      this.axios
        .get("http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset=0&limit=8&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
        .then(response => {
          this.allLoaded = false; // 可以进行上拉
          this.foodList = response.data;
          this.$refs.loadmore.onTopLoaded();
        })

  },
  methods: {
    //   下拉刷新
    loadTop() {
      this.loadFrist();
    },
    // 上拉加载
    loadBottom() {
      this.loadMore();
    },
    // 下拉刷新加载
    loadFrist() {
        
    },
    // 加载更多
    loadMore(){
      this.n+=8;
      this.axios
        .get("http://elm.cangdu.org/shopping/restaurants?latitude=39.78493&longitude=116.49476&offset="+this.n+"&limit=8&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=")
        .then(response => {
          // concat数组的追加
          if(response.data.length<8){
                this.show=false;
          }
          this.foodList = this.foodList.concat(response.data);
      
          this.$refs.loadmore.onBottomLoaded();
        })
        .catch(error => {
          alert("网络错误，不能访问");
        });
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .bbb{
    background-color: #F5F5F5;
    width:100%;
    height:100%;
    font-size: 0.4rem;
    overflow: scroll;
    .ccc{
      dl{
        width:100%;
        background-color: #fff;
        display: flex;
        padding: 0.2rem 0.1rem;
        border-bottom: 0.01rem solid #F2F2F2;
        dt{
          width:1.4rem;
          text-align: center;
          img{
            width:1.2rem;
          }
        }
        dd{
          flex:1;
          p{
            padding: 0.05rem 0;
          }
          .p1{
            font-size:0.29rem ;
            position:relative;
            display: flex;
            line-height: 0.3rem;
            .name{
              font-weight:bold;
              width:2.3rem;
              display: inline-block;
              white-space: nowrap;
              overflow:hidden;
              text-overflow: ellipsis;
            }
            .span1{
              background-color: #FED744;
              font-size:0.2rem ;
              padding: 0 0.05rem;
              border-radius: 0.05rem;
              margin-right:0.05rem; 
            }
            .span2{
              font-size:0.2rem ;
              padding: 0 0.05rem;
              border-radius: 0.05rem;
              margin-right:0.05rem; 
              color:#A7A7A7;
              position:absolute;
              right:0.1rem;
              transform:scale(0.9);  
              span{
                border:0.01rem solid #F5F5F5;
                margin: 0 0.03rem;
                padding: 0 0.05rem;
              }
            }
          }
          .p2{
            font-size:0.15rem ;
            color:#666666;
            position:relative;
            a{
              font-size: 0.2rem;
              color:#FC6120;
              padding: 0 0.2rem;
              .star{
                  width:1.2rem;
                  height:0.2rem;
                  font-size: 0.1rem;
                  display: inline-block;
                  background: url("https://img-bbs.csdn.net/upload/201510/22/1445523252_651795.png") no-repeat;
                  background-size: 1.2rem 0.22rem;
                  .xing{
                    height:0.2rem;
                    display: inline-block;
                    background: url("https://img-bbs.csdn.net/upload/201510/22/1445523260_910443.png") no-repeat;
                    background-size: 1.2rem 0.22rem;
                  }
              }
            }
            .mon{
              font-size: 0.18rem;
            }
            .span3{
              font-size:0.2rem ;
              padding: 0 0.05rem;
              border-radius: 0.05rem;
              margin-right:0.05rem; 
              color:#fff;
              position:absolute;
              right:0.8rem;
              background-color: #3792E5;
              transform:scale(0.8);     
            }
            .span4{
              font-size:0.2rem ;
              padding: 0 0.05rem;
              border-radius: 0.05rem;
              margin-right:0.05rem; 
              border:0.01rem solid #3792E5;
              color:#3792E5;
              position:absolute;
              right:0.2rem;
              transform:scale(0.8);   
            }
          }
          .p3{
            font-size: 0.2rem;
            color:#666;
            span:nth-of-type(3){
              margin-left: 0.2rem;
              color:#999999;
            }
            span:nth-of-type(4){
              color:#3A94E5;
            }
          }
        }
      }
    }
    
  }
</style>
