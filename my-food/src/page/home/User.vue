<template>
    <div class="user">
        <head-top headTitle="我的" :goback="true" class="header" :signinUp="false" >

        </head-top>
        <div class="content">
            <router-link tag="dl" to="/user/info" v-if="show">
                <dt>
                    <img :src='"http://elm.cangdu.org/img/"+this.avatar'/>
                </dt>
                <dd>        
                    <p class="deng"><span> {{this.uname}}</span><span> <i class="fa fa-fw fa-angle-right"></i></span></p>
                    <p class="bang">暂无绑定手机号</p>
                </dd>
            </router-link>
            <router-link tag="dl" to="/login"  v-else>
                <dt>
                    <img src="http://elm.cangdu.org/img/default.jpg" />
                </dt>
                <dd>    
                    <p class="deng"><span> 登录/注册 </span><span > <i class="fa fa-fw fa-angle-right"></i></span</p>
                    <p class="bang">暂无绑定手机号</p>
                </dd>
            </router-link>
            <ul class="you">
                <li>
                    <p><span>0.00</span> 元</p>
                    <p>我的余额</p>
                </li>
                <li>
                    <p><span>0</span> 个</p>
                    <p>我的优惠</p>
                </li>
                <li>
                    <p><span>0</span> 分</p>
                    <p>我的积分</p>
                </li>
            </ul>
            <ul class="ding">
                <li><p><router-link to="/order">我的订单</router-link> <i class="fa fa-fw fa-angle-right"></i></p></li>
                <li><p><router-link to="/order">积分商城</router-link>  <i class="fa fa-fw fa-angle-right"></i></p></li>
                <li><p><router-link to="/order">饿了么会员卡</router-link> <i class="fa fa-fw fa-angle-right"></i></p></li>
            </ul>
            <ul class="ding">
                <li><p><router-link to="/order">服务中心</router-link> <i class="fa fa-fw fa-angle-right"></i></p></li>
                <li><p><router-link to="/order">下载饿了么APP</router-link> <i class="fa fa-fw fa-angle-right"></i></p></li>
            </ul>
        </div>
        
         <foot-bottom></foot-bottom>
    </div>
</template>

<script>
import headTop from "../../components/header/head"
import footBottom from '../../components/footer/ComFooter'
export default {
    components:{
        headTop,
        footBottom
    },
    data(){
        return{
            uname:"",
            avatar:"",
            show:false
        }
    },
    mounted(){
        let user_id=localStorage.getItem('user_id')
        if(user_id!==(""||null)){
            this.axios.get(`http://elm.cangdu.org/v1/user?user_id=${user_id}`)
            .then((res)=>{
                    // console.log(res)
                if(res.data){
                    this.uname=res.data.username,
                    this.avatar=res.data.avatar,
                    this.show=true
                }
            })
        }
    },
    methods:{
        
    }
}
</script>


<style lang="scss" scoped>
    .user{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .content{
            overflow: auto;
        }
        dl{
            background-color: #3190E8;
            width:100%;
            display: flex;
            margin: 0;
            color:#fff;
            padding: 0.2rem 0;
            dt{
                flex:1;
                text-align: center;
                padding-top: 0.1rem;
                img{
                    width:65%;
                    border-radius: 50%;
                }
            }
            dd{
                padding-top: 0.2rem;
                flex:3;
                .deng{
                    font-size: 0.35rem;
                    position: relative;
                    span{
                        color:#fff;
                        font-weight: bold;
                    }
                    i{
                        position: absolute;
                        right:0.2rem;
                        top:0.15rem;
                        font-size: 0.35rem;
                    }
                }
                .bang{
                    font-size: 0.22rem ;
                }
            }
        }
        .you{
            width:100%;
            display: flex;
            background-color: #fff;
            li{
                flex:1;
                text-align: center;
                padding: 0.25rem;
                border-left:0.01rem solid #F2F2F2;
                p{
                    margin: 0;
                    font-size: 0.24rem;
                }
                p:nth-of-type(2){
                    color:#666666;
                }
                span{
                    font-size: 0.5rem;
                    font-weight: bold;
                    color:#FF9900;
                }
                &:nth-of-type(1){
                    border:none;
                }
                &:nth-of-type(2){
                    span{
                        color:#FF5F3E;
                    }
                }
                &:nth-of-type(3){
                    span{
                        color:#6AC20B;
                    }
                }
            }
        }
        .ding{
            width:100%;
            margin-top: 0.2rem;
            background-color: #fff;
            li{
                width:100%;
                p{
                    font-size: 0.26rem;
                    margin: 0;
                    margin-left: 0.5rem;
                    padding: 0.16rem 0;
                    border-bottom:0.02rem solid #F4F4F4;
                    a{
                        color:#373737;
                    }
                }
                i{
                    float: right;
                    color:#BBBBBB;
                    font-size: 0.3rem;
                }
            }
        }
    }
</style>