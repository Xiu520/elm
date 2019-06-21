<template>
    <div class="forget">
        <head-top headTitle="重置密码" :goback="true" class="header" :signinUp="false" >

        </head-top>
        
        
    
        <div class="form">
            <ul>
                <li><input type="text" placeholder="账号" ref="uname"></li>
                <li><input type="text" placeholder="旧密码" ref="oldpass"></li>
                <li><input type="text" placeholder="请输入新密码" ref="newpass"></li>
                <li><input type="text" placeholder="确认密码" ref="rightpass"></li>
                <li>
                    <input type="text" placeholder="验证码" ref="code">
                    <img :src='arr.code 'alt=""/>
                    <div class="right">
                        <p>看不清</p>
                        <p  @click="changePage">换一张</p>
                    </div>
                </li>
            </ul>
        </div>
        
        <div class="btn">
            <button @click="Updata">确认修改</button>
        </div>
       
        <div class="alet" v-if="warn">
            <section class="tip_text_container">
                <div class="tip">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p>{{warn}}</p>
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
        times(){
            this.warn=""
        },
        setCookie(name,value,day){
            var exp=new Date();
            exp.setDate(exp.getDate()+day);
            document.cookie=name+"="+escape(value)+";expires="+exp.toGMTString();
        },
        Updata(){
            console.log(this.$refs.code.value)
            this.setCookie("cap",this.$refs.code.value,5)
            let data={
                captcha_code:this.$refs.code.value,
                confirmpassword:this.$refs.rightpass.value,
                newpassword:this.$refs.newpass.value,
                oldpassWord:this.$refs.oldpass.value,
                username:this.$refs.uname.value,
            }
            this.axios.post("http://elm.cangdu.org/v2/changepassword",data)
            .then(res=>{
                if(res.data){
                    if(res.data.status===0){
                        this.warn=res.data.message
                    }else{
                        this.warn=res.data.success
                    }
                }
            })
        }
    }
}
</script>


<style lang="scss" scoped>
    .forget{
        width:100%;
        height:100%;
        .form{
            margin-top: 0.3rem;
            width:100%;
            ul{
                width:100%;
                li{
                    position:relative;
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
                    &:nth-of-type(5){
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
        
        .btn{
            margin-top: 0.3rem;
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
        
        //遮罩
        .alet{
            width:100%;
            height:100%;
            position: absolute;
            top:0;
            left:0;
            .tip_text_container{
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
</style>