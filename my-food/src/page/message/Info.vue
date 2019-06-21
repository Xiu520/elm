<template>
    <div class="info">
        <head-top headTitle="账户信息" :goback="true" class="header" :signinUp="false" >

        </head-top>
        <div class="list">
            <ul >
                <li><span>头像 </span>
                    <div class="right">
                        <img :src='file' v-if="file"/>
                        <img :src='"http://elm.cangdu.org/img/"+userList.avatar' v-else/>

                        <span> <i class="fa fa-fw fa-angle-right"></i></span>
                       
                        <input type="file" accept="image/jpeg, image/jpg, image/png" @change="handFile" />   
                    </div>
                </li>
                <router-link tag="li" :to="{name:'setusername'}">用户名 <div class="right"><span>{{userList.username}}</span><i class="fa fa-fw fa-angle-right"></i></div></router-link >
                <router-link tag="li" :to="{name:'address'}">收货地址 <div class="right"><i class="fa fa-fw fa-angle-right"></i></div></router-link>
                <p>账号绑定</p>
                <li>手机 <div class="right"><i class="fa fa-fw fa-angle-right"></i></div></li>
                <p>安全设置</p>
                <router-link tag="li" to="/forget">登录密码 <div class="right"><span>修改</span><i class="fa fa-fw fa-angle-right"></i></div></router-link>
            </ul>
        </div>
        <div class="btn">
            <button @click="giveUp">退出登录</button>
        </div>

        <div class="alet" v-if="warn">
            <section class="tip_text_container">
                <div class="tip">
                    <div class="tip_icon">
                        <span></span>
                        <span></span>
                    </div>
                    <p>是否退出登录</p>
                </div>
                <p>
                    <button @click="Wait">再等等</button>
                    <button @click="Back">退出登录</button>
                </p>       
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
            warn:false,  
            userList:[],
            file:"",

        }
    },
    mounted(){
        let user_id=localStorage.getItem("user_id")
        this.axios.get(`http://elm.cangdu.org/v1/user?user_id=${user_id}`)
        .then((res)=>{
            if(res.data){
                this.userList=res.data
            }
        })
    },
    methods:{
        giveUp(){
            this.warn=true
        },
        Wait(){
            this.warn=false
        },
        Back(){
            localStorage.removeItem("user_id")
            this.$router.push("/user")
        },
        handFile(e) {
            console.log(e)
            e.preventDefault()//阻止浏览器进行 默认行为
            let $target = e.target || e.srcElement;
            //获取上传文件信息
            let file = $target.files[0];
            //读取文件
            var reader = new FileReader();
            //读取完成
            reader.onload = data => {
                let res = data.target || data.srcElement;
                this.file = res.result;
            }
            // 通过FormData对象发送表单数据
            let formData = new FormData(); 
            formData.append('file', file); 
            const instance=this.axios.create({
                withCredentials: true
                // 需要设置 withCredentials：true , 表示跨域请求时是否需要使用凭证. 默认为false
            })  

            //将头像通过接口上传到浏览器
            let user_id=localStorage.getItem('user_id');
            instance.post('http://elm.cangdu.org/eus/v1/users/'+user_id+'/avatar',formData)
            .then(res => {
                
            })
            //把文件地址读取出来
            reader.readAsDataURL(file);
        }
    }
}
</script>

<style lang="scss" scoped>
.info{
    width:100%;
    height:100%;
    .list{
        width:100%;
        padding-top: 0.2rem;
        ul{
            width:100%;
            li{
                background-color: #fff;
                padding: 0.2rem 0 0.2rem  0.3rem;
                border-bottom:0.01rem solid #DDDDDD;
                .right{
                    font-size: 0.45rem;
                    color:#D8D8D8;
                    display: flex;
                    span{
                        font-size: 0.3rem;
                        color:#999999;
                    }
                    i{
                        margin-top:-0.05rem; 
                    }
                }
                &:nth-of-type(1){
                    border-top:0.01rem solid #DDDDDD;
                    padding: 0 0 0 0.3rem;
                    height: 1.3rem;
                    line-height: 1.3rem;
                    position: relative;
                    .right{
                        font-size: 0.45rem;
                        color:#D8D8D8;
                        display: flex;
                        img{
                            width:0.8rem;
                            height: 0.8rem;
                            border-radius: 50%;
                            margin-top: 0.2rem;
                        }
                        i{
                            font-size: 0.45rem;
                            color:#D8D8D8;
                            margin-top:-0.05rem; 
                        }
                    }
                    input{
                        position: absolute;
                        top:0;
                        right:0;
                        width:100%;
                        height:100%;
                        display: block;
                        opacity: 0;
                        border-radius: 50%; 
                    }
                }
                
            }
            p{
                padding: 0.1rem 0.2rem;
                font-size: 0.24rem;
                color:#666666;
                border-bottom:0.01rem solid #DDDDDD;
            }
        }
    }
    .btn{
        width:100%;
        padding: 0.3rem;
        button{
            width:100%;
            padding: 0.14rem;
            color:#fff;
            border-radius: 0.07rem;
            background-color: #D8584A;
        }
    }
    //遮罩
    .alet{
        width:100%;
        height:100%;
        position: absolute;
        top:0;
        left:0;
        background-color: rgba(0,0,0,0.2);
        .tip_text_container{
            animation: bounceIn 400ms ;
            position: absolute;
            width:6rem;
            height:5rem;
            top:2.5rem;
            left:0.4rem;
            border-radius: 0.06rem;
            background-color: #fff;
            .tip{
                width:100%;
                height:3.5rem;
                border-radius: 0.1rem 0.1rem 0 0;
                padding-top: 0.35rem;
                text-align: center;
                .tip_icon{
                    width: 1.6rem;
                    height: 1.6rem;
                    border: 0.07rem solid #F8BB86;
                    border-radius: 50%;
                    margin: 0.3rem auto;
                    padding-top: 0.1rem;
                    span:nth-of-type(1){
                        border-radius: 0.05rem;
                        display: block;
                        margin: 0rem auto;
                        width: 0.1rem;
                        height: 0.9rem;
                        background-color: #F8BB86;
                    }
                    span:nth-of-type(2){
                        display: block;
                        margin: 0.1rem auto;
                        width: 0.13rem;
                        height: 0.13rem;
                        background-color: #F8BB86;
                        border-radius: 50%;
                    }
                }
                p{
                    margin-top:0.5rem;
                    line-height: 0.7rem;
                    font-size: 0.5rem;
                }
            }
            &>P{
                display: flex;
                margin: 0.3rem auto;
                width:3.5rem;
                button{
                    padding:0.15rem 0.3rem;
                    border:none;
                    border-radius: 0.06rem;
                    background-color: #DD6B55;
                    color:#fff;
                    &:nth-of-type(1){
                        background-color: #C1C1C1;
                        margin-right: 0.3rem;
                    }
                }
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
