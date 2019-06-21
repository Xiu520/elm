<template>
    <div class="login">
        <head-top headTitle="密码登录" :goback="true" class="header" :signinUp="false" >

        </head-top>

        <div class="form">
            <ul>
                <li>
                    <input type="text" placeholder="账号" ref="user">
                </li>
                <li>
                    <input type="password" placeholder="密码"  ref="psd">
                </li>
                <li>
                    <input type="text" placeholder="验证码" ref="code">
                    <img :src='this.arr.code 'alt=""/>
                    <div class="right">
                        <p>看不清</p>
                        <p @click="changePage">换一张</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="red">
            <p>温馨提示：未注册过的账号，登录时将自动注册</p>
            <p>注册过的用户可凭账号密码登录</p>
        </div>
        <div class="btn">
            <button @click="Login">登录</button>
        </div>
        <div class="a">
            <router-link to="/forget">重置密码？</router-link>
        </div>
        <div class="alet" v-if="this.warn">
            <section class="tip_text_container">
                <div class="tip">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p>{{this.warn}}</p>
                </div>
                <button @click="times">确认</button>
            </section>
        </div>
    </div>
</template>

<script>
import headTop from '../../components/header/head'
export default {
    components:{
        headTop,
    },
    data(){
        return{
            arr:[],
            warn:""
        }
    },
    mounted(){
        this.axios.post("http://elm.cangdu.org/v1/captchas")
        .then(res=>{
            if(res.data){
                this.arr=res.data
            }
        })

    },
    methods:{
        changePage(){
            this.axios.post("http://elm.cangdu.org/v1/captchas")
            .then(res=>{
                if(res.data){
                    this.arr=res.data
                }
            })
        },
        setCookie(name,value,day){
            var exp=new Date();
            exp.setDate(exp.getDate()+day);
            document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
        },
        Login(){
            let username=this.$refs.user.value;
            let password=this.$refs.psd.value;
            let code=this.$refs.code.value;

            let userBool=/^1[3|4|5|7|8]\d{9}$/.test(username);
            let pswBool=/^[0-9]{6}$/.test(password);
            let codeBool=/^[0-9]{4}$/.test(code);

            if(!userBool){
                this.warn="用户名格式错误"
            }
            if(!pswBool){
                this.warn="密码格式错误"
            }
            if(!codeBool){
                this.warn="验证码格式错误"
            }
            if(!userBool&&!pswBool&&!codeBool){
                this.warn="请输入用户名/密码/验证码"
            }
            if(userBool&&pswBool&&codeBool){
                this.setCookie("cap",code,5)
                let data={
                    captcha_code:code,
                    password:password,
                    username:username
                }
                this.axios.post("http://elm.cangdu.org/v2/login",data)
                .then(res=>{
                    if(res.data){
                        if(res.data.status===0){
                            this.warn=res.data.message
                        }else{
                            this.$store.commit('login',res.data.id)
                            this.$router.push("/user")
                        }
                    }
                })
            }
            
        },
        times(){
            this.warn=""
        }
    }
}
</script>


<style lang="scss" scoped>
    .login{
        width:100%;
        height:100%;
        .form{
            margin-top: 0.3rem;
            width:100%;
            ul{
                width:100%;
                li{
                    input{
                        width:100%;
                        border-bottom: 0.01rem solid #F2F2F2;
                        height:0.9rem;
                        padding-left: 0.3rem;
                        font-size: 0.3rem;
                        color:#757575;
                        &::placeholder{
                            color:#757575;
                        }
                    }
                    &:nth-of-type(3){
                        position:relative;
                        img{
                            position: absolute;
                            top:0.2rem;
                            right:1.1rem;
                        }
                        .right{
                            position: absolute;
                            right:0.3rem;
                            top:0.1rem;
                            font-size: 0.24rem;
                            p:nth-of-type(1){
                                color:#666666;
                            }
                            p:nth-of-type(2){
                                color:#3B95E9;
                            }
                        }
                    }
                    
                }
            }
            
        }
        .red{
            color:#FF0000;
            font-size: 0.22rem;
            padding-left: 0.25rem;
            p{
                padding: 0.1rem 0;
            }
        }
        .btn{
            width:100%;
            padding: 0 0.25rem;
            button{
                width:100%;
                background-color: #4CD964;
                color:#fff;
                padding: 0.17rem 0;
                font-size: 0.3rem;
                border-radius: 0.07rem;
            }
        }
        .a{
            width:100%;
            text-align: right;
            padding-top: 0.25rem;
            padding-right: 0.1rem;
        }
        //遮罩
        .alet{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            .tip_text_container{
                animation: bounceIn 400ms ;
                position: absolute;
                width:5rem;
                height:3.3rem;
                top:3.3rem;
                left:0.8rem;
                .tip{
                    width:100%;
                    height:2.5rem;
                    background-color: #fff;
                    border-radius: 0.1rem 0.1rem 0 0;
                    padding-top: 0.35rem;
                    text-align: center;
                    .tip_icon{
                        width: 1.3rem;
                        height: 1.3rem;
                        border: 0.06rem solid #f8cb86;
                        border-radius: 50%;
                        margin: 0rem auto;
                        padding-top: 0.1rem;
                        span:nth-of-type(1){
                            display: block;
                            margin: 0rem auto;
                            width: 0.05rem;
                            height: 0.7rem;
                            background-color: #f8cb86;
                        }
                        span:nth-of-type(2){
                            display: block;
                            margin: 0.1rem auto;
                            width: 0.08rem;
                            height: 0.08rem;
                            background-color: #f8cb86;
                        }
                    }
                    p{
                        margin: 0;
                        line-height: 0.7rem;
                        font-size: 0.3rem;
                    }
                }
                
                button{
                    width:100%;
                    height:0.8rem;
                    border:none;
                    border-radius: 0 0 0.1rem 0.1rem;
                    background-color: #4CD964;
                    font-size: 0.35rem;
                    color:#fff;
                    font-weight: bold;
                }
            }
        }
    }

    
@keyframes bounceIn {
  from, 30%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
  
  30% {
    -webkit-transform: scale3d(.8, .8, .8);
    transform: scale3d(.8, .8, .8);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2);
    transform: scale3d(1.2, 1.2, 1.2);
  }

  80% {
    -webkit-transform: scale3d(.97, .97, .97);
    transform: scale3d(.97, .97, .97);
  }

  to {
    opacity: 1;
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
  }
}

.bounceIn {
  -webkit-animation-name: bounceIn;
  animation-name: bounceIn;
}
</style>