<template>
    <div class="box">
        <Load v-if="num!== 1"></Load>

        <div class="con" v-if="navList.length">
            <header>
                <ul>
                    <li>
                        <div>
                            <a @click='$router.go(-1)'>
                                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                                    <polyline points="12,18 4,9 12,0" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"></polyline>
                                </svg>
                            </a>
                            <img :src="'https://elm.cangdu.org/img/'+headList.image_path" alt="">
                        </div>
                        <div>
                            <p>{{headList.name}}</p>
                            <p>
                                商家配送/分钟送到/配送费￥{{headList.float_delivery_fee}} 
                                <span @click='$router.go(-1)'>
                                    <svg data-v-c8684834="" width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow">
                                        <path data-v-c8684834="" d="M0 0 L8 7 L0 14" stroke="#fff" stroke-width="1" fill="none"></path>
                                    </svg>
                                </span>
                            </p>
                            <p>公告：{{headList.promotion_info}}</p>
                        </div>
                    </li>
                </ul>
                <p class="pp" v-if="activity"><span>{{activeList.icon_name}}</span>{{activeList.description}}(APP专享)</p>
            </header>
            <div class="cc1">
                <div class="nav">
                    <ul>
                        <li  v-on:click="shopNav=true"  ><span :class="{active:shopNav}">商品</span></li>
                        <li  v-on:click="shopNav=false"  ><span :class="{active:!shopNav}">评价</span></li>
                    </ul>
                </div>
                <div class="content" v-if="shopNav">
                    <div class="left menu-wrapper" ref="menuWrapper" >
                        <ul >
                            <li v-for="(item,index) in navList" :key="item.id" class="menu-item border-1px" :class="{action:i==index}" @click="change(item.id,index)">{{item.name}}</li>
                        </ul>
                    </div>
                    
                    <div  class="right foods-wrapper"  id="Right" ref="foodWrapper">
                        <div>
                            <dl v-for="item in navList" :key="item.id" class="food-list food-list-hook">
                                <dt class="dl" :id="item.id"><span>{{item.name}}</span> <span>{{item.description}}</span></dt>
                                <dd v-for="i in item.foods" :key="i._id" >
                                    <ul>
                                        <li><img :src="'https://elm.cangdu.org/img/'+i.image_path"></li>
                                        <li>
                                            <p class="p1">{{i.name}}</p>
                                            <p class="p2">{{i.description}}</p>
                                            <p class="p3"><span class="count">月售{{i.month_sales}}</span>   <span class="count">好评率{{i.satisfy_rate}}%</span></p>
                                            <p class="img" v-if="i.activity"><span>{{i.activity.image_text}}</span></p>
                                            <p class="p4">￥<span class="mon">{{i.specfoods[0].price}}</span><span class="qi">起</span>
                                                <span v-if="i.specifications!=''" class="gui">选规格</span>
                                                <span  class="jia" v-else @click="Add(i,$event)"><i class="el-icon-circle-plus"></i></span>
                                            </p>
                                        </li>
                                    </ul>
                                </dd>
                            </dl>
                        </div> 
                    </div>
                </div>
            </div>
            <div class="content"  v-if="!shopNav">
                评价
            </div>
            <div class="footer" >
                <div class="left" @click="Cart" v-if="isShow">
                    <div class="cart1 shopping_footer" >
                        <i class="fa fa-fw fa-shopping-cart"></i>
                        <span>{{totalNum}}</span>
                    </div>
                    <div class="total">
                        <p>￥{{totalPrice}}</p>
                        <p>配送费￥5</p>
                    </div>
                </div>
                <div class="left1" v-else>
                    <div class="cart">
                        <i class="fa fa-fw fa-shopping-cart"></i>
                    </div>
                    <div class="total">
                        <p>￥{{totalPrice}}</p>
                        <p>配送费￥5</p>
                    </div>
                </div>
                <router-link tag="div" to="/order" class="right1" v-if="isShow">去结算</router-link>
                <div class="right" v-else>还差￥20起送</div>
            </div>
            <div class="cartlist" v-show="showcart">
                <ul>
                    <p><span>购物车</span><span @click="delAll">清空</span></p>
                    <div class="li">
                        <li v-for="item in cartList">
                            <span>{{item.name}}</span><span>￥{{item.price}}</span>
                            <span><i class="el-icon-remove-outline" @click="Less(item)"></i> <span>{{item.num}}</span> <i class="el-icon-circle-plus" @click="add(item)"></i></span>
                        </li>
                    </div>
                   
                </ul>
            </div>
            <!-- 小球 -->
            <!-- <div id="points">
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
                <div class="pointOuter pointPre">
                    <div class="point-inner"></div>
                </div>
            </div> -->
        </div>
        <ul v-else class="animation_opactiy">
            <li class="list_back_li" v-for="item in 1" :key="item">
                <img src="../../images/shop_back_svg.svg" class="list_back_svg">
            </li>
        </ul>
        
    </div>
</template>

<script>
import BScroll from "better-scroll"
import $ from "jquery"
import Load from "../../components/animeta";
import {TheBall} from "../../components/theball/theBall"
export default {
    components:{
        Load
    },
    data(){
        return{
            shopNav:true, //选项卡切换
            i:0, //左边路由样式切换
            headList:[], //头部渲染列表
            navList:[],//左边路由渲染列表
            activeList:[],//热卖活动
            activity:true, //热卖活动是否显示
            isShow:false,
            listHeight: [],
            scrollY: 0,
            cartList:[],
            showcart:false,
            totalNum:0,
            totalPrice:"0.00",
            num: 1,
        }
    },
    mounted(){
        this.num = this.num - 1;
        
        this.axios
        .get("http://elm.cangdu.org/shopping/restaurant/"+this.$route.params.id+"?latitude=45.80031&longitude=126.50329&extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics")
        .then(res=>{
            if(res.data&&res.data.activities.length>0){
                this.headList=res.data;
                this.activeList=res.data.activities[0]
            }else{
                this.headList=res.data;
                this.activity=false
            }
        })
        this.axios
        .get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id="+this.$route.params.id)
        .then(res=>{
            if(res.data){
                this.navList=res.data
                this.num = this.num + 1;
            }
        })

        this.get()
        $("#Right").scroll(this.more.bind(this))
    }, 
   
    methods:{
        get(){
            let list=JSON.parse(localStorage.getItem("buyCart"))
            let total=JSON.parse(localStorage.getItem("total"))
            if(list.length){
                this.cartList=list  
                this.isShow=true
                this.totalNum=total.totalNum
                this.totalPrice=total.totalPrice
            }
            else{
                this.isShow=false
                this.showcart=false
            }
        },
        
        //左右联动
        more(){
            let scrollTop=document.getElementById("Right").scrollTop;//滚动条的高
            let dlArr=document.getElementsByClassName("dl")//找到所有dl
            for(let i=0;i<dlArr.length;i++){
                if(scrollTop>=dlArr[i].offsetTop&&scrollTop<dlArr[i+1].offsetTop){
                    this.i=i+1
                }
            }
        },
        //左右联动
        change(id,index){
            $("#Right").unbind("scroll")
            this.i=index
            let dl=document.getElementById(id);
            let top=dl.offsetTop;
            $("#Right").animate({"scrollTop":top},()=>{
                $("#Right").scroll(this.more.bind(this))
            })
        },

        //增加
        Add(i,event){
            TheBall.newBall(event)
            // var top = event.clientY, // 小球降落起点
            // left = event.clientX,
            // endTop = window.innerHeight-30 ,  // 小球降落终点
            // endLeft = 30;
            // // 小球到达起点
            // var outer = $('#points .pointPre').first().removeClass("pointPre").css({
            //     left: left + 'px',
            //     top: top + 'px'
            // });
            // var inner = outer.find(".point-inner");
            // setTimeout(function () {
            //     // 将jquery对象转换为DOM对象
            //     outer[0].style.webkitTransform = 'translate3d(0,' + (endTop - top) + 'px,0)';
            //     inner[0].style.webkitTransform = 'translate3d(' + (endLeft - left) + 'px,0,0)';
            //     // 小球运动完毕恢复到原点
            //     setTimeout(function () {
            //         outer.removeAttr("style").addClass("pointPre");
            //         inner.removeAttr("style");
            //     }, 1000);  //这里的延迟值和小球的运动时间相关
            // }, 1);
            
            // let div=document.createElement('div');
            // div.className='ballFather';
            // document.body.appendChild(div);

            // let sonDiv=document.createElement('div');
            // sonDiv.className='ballSon';
            // div.appendChild(sonDiv);



            this.isShow=true
            let item=i.specfoods[0]
            let data={"num":0,"id":6582,"name":item.name,"price":item.price,"specs":"item.specs","packing_fee":item.packing_fee,"sku_id":item.sku_id,"stock":item.stock}
            this.$store.commit("Add",data)
            this.get()
        },
        //购物车加
        add(item){
            let data={"num":item.num,"id":6582,"name":item.name,"price":item.price,"specs":"item.specs","packing_fee":item.packing_fee,"sku_id":item.sku_id,"stock":item.stock}
            this.$store.commit("Add",data)
            this.get()
        },
        //购物车减
        Less(item){
            this.$store.commit("Less",item)
            this.get()
        },
        //清空购物车
        delAll(){
            let arr=[]
            let data={"totalNum":0,"totalPrice":0.00}
            localStorage.setItem("buyCart",JSON.stringify(arr))
            localStorage.setItem("total",JSON.stringify(data))
            this.totalPrice="0.00"
            this.get()
        },
        //购物车列表显示
        Cart(){
            this.get()
            this.showcart=!this.showcart
        }
    }
}
</script>


<style lang="scss" scoped>
    // @import "../../components/theball/theBall";
    // #points{
    //     .pointOuter {
    //         position: absolute; 
    //         z-index: 1; 
    //         /* 当小球抛出时遵循贝塞尔曲线过渡 */
    //         -webkit-transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s;
    //         transition: all 1s cubic-bezier(0.39,-0.4,0.83,0.23) 0s; 
    //     }
    //     .point-inner {
    //         width: 15px;
    //         height: 15px;
    //         border-radius: 50%;
    //         background-color: #3190E8;
    //         /* 过渡属性名称 过渡时间 过渡曲线 延迟时间 */
    //         transition: all 1s ease 0s;
    //         -webkit-transition: all 1s ease 0s;     
    //     }
    //     .pointPre {
    //         /* 动画的小球 */
    //         display: none;
    //     }
    // }
    
    .box,.con{
        width: 100%;
        height:100%;
        background-color: #F5F5F5;
        display: flex;
        flex-direction: column;
        header{
            width: 100%;
            height: 2rem;
            background-color:#AB99C9;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    display: flex;
                    div:nth-of-type(1){
                        width: 25%;
                        position:relative;
                        img{
                            width: 1.3rem;
                            margin-left: 0.2rem;
                            margin-top: 0.2rem;
                        }
                        a{
                            color:#fff;
                            width:0.9rem;
                            height:0.9rem;
                            font-size:0.4rem;
                            position:absolute;
                            left:0.05rem;
                            top:0.05rem;
                        }
                    }
                    div:nth-of-type(2){
                        flex: 1;
                        p{
                            color:#fff;
                            font-size: 0.2rem;
                            padding: 0.03rem 0;
                        }
                        p:nth-of-type(1){
                            font-size: 0.34rem;
                            font-weight: bold;
                            padding-top: 0.2rem;
                        }
                        span{
                            display: float;
                            margin-left:1.9rem; 
                            font-size: 0.24rem;
                        }
                    }
                }
            }
            .pp{
                font-size: 0.2rem;
                color:#fff;
                padding-left: 0.2rem;
                margin-top: -0.15rem;
                span{
                    background-color: #F07373;
                    color:#fff;
                    padding: 0 0.03rem;
                    border-radius: 0.05rem;
                    margin-right: 0.05rem;
                }
            }
        }
        .cc1{
            width:100%;
            flex:1;
            display: flex;
            flex-direction: column;
        }
        .nav{
            width:100%;
            height: 0.9rem;
            border-bottom:0.01rem solid #eee;
            ul{
                width: 100%;
                display: flex;
                list-style: none;
                background-color: #fff;
                li{
                    flex: 1;
                    text-align: center;
                    line-height: 0.9rem;
                    font-size: 0.3rem;
                    color:#828282;
                    padding-bottom: 0.03rem;
                    .active{
                        color:#3792E5;
                        border-bottom: 0.05rem solid #3792E5;
                    }
                }
                
            }
        }
        .content{
            width: 100%;
            flex:1;
            display: flex;
            .left{
                width:25%;
                list-style: none;
                overflow: auto;
                ul{
                    width:100%;
                    li{
                        color:#666666;
                        font-size: 0.3rem;
                        padding: 0.4rem 0;
                        padding-left: 0.3rem;
                        width:1.7rem;
                        white-space: nowrap;
                        overflow:hidden;
                        text-overflow: ellipsis;
                        border-bottom:0.01rem solid #EDEDED;
                        
                    }
                    .action{
                        background-color: #fff;
                        border-left:0.05rem solid #3792E5;
                        font-weight: bold;
                    }
                }
            }
            
            .right{
                flex:1;
                margin-top: 0.08rem;
                overflow: auto;
                dl{
                    width:100%;
                    dt{
                        font-size: 0.32rem;
                        padding: 0.25rem 0.3rem;
                        background-color: #F5F5F5;
                        color:#666666;
                        span:nth-of-type(1){
                            font-weight: bold;
                        }
                        span:nth-of-type(2){
                            font-size: 0.22rem;
                            margin-left: 0.1rem;
                        }
                    }
                    dd{
                        background-color: #fff;
                        width:100%;
                        border-bottom:0.02rem solid #F8F8F8;
                        ul{
                            list-style: none;
                            width:100%;
                            display: flex;
                            li:nth-of-type(1){
                                padding:0 0.2rem;
                                width:1.1rem;
                                img{
                                    width:0.9rem;
                                }
                            }
                            li:nth-of-type(2){
                                padding:0.15rem;
                                flex:1;
                                p{
                                    padding: 0.03rem 0;
                                }
                                .p1{
                                    width:3rem;
                                    font-size: 0.3rem;
                                    font-weight: bold;
                                    color:#333333;
                                    white-space: nowrap;
                                    overflow:hidden;
                                    text-overflow: ellipsis;
                                }
                                .p2{
                                    font-size: 0.2rem;
                                    color:#9C9C9C;
                                }
                                .p3{
                                    font-size: 0.2rem;
                                }
                                .img{
                                    font-size: 0.17rem;
                                    color:#F1884F;
                                    span{
                                        padding: 0 0.05rem;
                                        border-radius: 0.5rem;
                                        border:0.01rem solid #F1884F;
                                    }
                                }
                                .p4{
                                    font-size: 0.2rem;
                                    color:#FC6721;
                                    .mon{
                                        font-size: 0.26rem;
                                        font-weight: bold;
                                    }
                                    .qi{
                                        color:#333;
                                        margin-left: 0.1rem;
                                    }
                                    .gui{
                                        background-color: #3190E8;
                                        font-size: 0.22rem;
                                        color:#fff;
                                        padding: 0.03rem 0.09rem;
                                        border-radius: 0.05rem;
                                        display: float;
                                        margin-left: 2rem;
                                    }
                                    .jia{
                                        font-size: 0.34rem;
                                        color:#3190E8;
                                        display: float;
                                        margin-left: 2.4rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        .footer{
            width:100%;
            height:0.9rem;
            font-size: 0.29rem;
            display: flex;
            z-index: 9;
            .left{
                width:4.7rem;
                background-color: #3D3D3F;
                height:100%;
                position: relative;
                .cart1{
                    position:absolute;
                    width:1rem;
                    height:1rem;
                    line-height: 0.85rem;
                    font-size: 0.55rem;
                    color:#fff;
                    text-align: center;
                    border:0.07rem solid #444444;
                    border-radius: 50%;
                    top:-0.31rem;
                    left:0.3rem;
                    background-color: #3190E8;
                    span{
                        position: absolute;
                        width:0.35rem;
                        height:0.35rem;
                        border-radius: 50%;
                        background-color: red;
                        color:#fff;
                        font-size: 0.22rem;
                        line-height: 0.35rem;
                        bottom:0.5rem;
                        left:0.6rem;
                    }
                }
                .total{
                    padding-left: 1.5rem;
                    color:#fff;
                    padding-top: 0.1rem;
                    p:nth-of-type(1){
                        font-size: 0.33rem;
                        font-weight: bold;
                        padding-top: 0.13rem 0;
                    }
                    p:nth-of-type(2){
                        font-size: 0.2rem;
                    }
                }
            }
            .left1{
                width:4.7rem;
                background-color: #3D3D3F;
                height:100%;
                position: relative;
                .cart{
                    position:absolute;
                    width:1rem;
                    height:1rem;
                    line-height: 0.85rem;
                    font-size: 0.55rem;
                    color:#fff;
                    text-align: center;
                    background-color: #3D3D3F;
                    border:0.07rem solid #444444;
                    border-radius: 50%;
                    top:-0.31rem;
                    left:0.3rem;
                }
                .total{
                    padding-left: 1.5rem;
                    color:#fff;
                    padding-top: 0.1rem;
                    p:nth-of-type(1){
                        font-size: 0.33rem;
                        font-weight: bold;
                        padding-top: 0.13rem 0;
                    }
                    p:nth-of-type(2){
                        font-size: 0.2rem;
                    }
                }
            }
            .right{
                flex:1;
                height:100%;
                background-color: #535356;
                text-align: center;
                line-height: 0.9rem;
                color:#fff;
                font-weight: bold;
            }
            .right1{
                flex:1;
                height:100%;
                text-align: center;
                line-height: 0.9rem;
                color:#fff;
                font-weight: bold;
                background-color: #4CD964;
            }
        }
        .animation_opactiy{
            width:100%;
            height:100%;
            li{
                width:100%;
                height:100%;
                img{
                    width:100%;
                    height:100%;
                }
            }
        }
        .cartlist{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            z-index: 7;
            background-color: rgba(0,0,0,0.3);
            ul{
                width:100%;
                background-color: #fff;
                position:absolute;
                bottom:0.9rem;
                max-height: 75%;
                display: flex;
                flex-direction: column;
                p{
                    padding: 0.2rem;
                    width:100%;
                    font-size: 0.27rem;
                    height:0.75rem;
                    z-index: 8;
                    background-color: #ECEFF1;
                    display: flex;
                    justify-content: space-between;
                    color:#6A6A6A;
                    span:nth-of-type(2){
                        font-size: 0.24rem;
                    }
                }
                .li{
                    width:100%;
                    flex:1;
                    overflow: auto;
                }
                li{
                    display: flex;
                    justify-content: space-between;
                    padding:0.3rem 0.2rem ;
                    border-bottom: 0.01rem solid #eee;
                    span:nth-of-type(1){
                        width:50%;
                        white-space: nowrap;
                        overflow:hidden;
                        text-overflow: ellipsis;
                        color:#666666;
                        font-weight: bold;
                        font-size: 0.28rem;
                    }
                    span:nth-of-type(2){
                        color:#FF6600;
                        font-weight: bold;
                        font-size: 0.28rem;
                    }
                    span:nth-of-type(3){
                        i{
                            font-size: 0.34rem;
                            color:#3190E8;
                        }
                        
                    }
                }
            }
        }
    }
</style>