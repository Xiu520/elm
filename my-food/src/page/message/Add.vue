<template>
    <div class="add">
        <head-top headTitle="新增地址" :goback="true" class="header" :signinUp="false" >

        </head-top>
        <ul class="form">
            <li><input type="text" placeholder="请填写你的姓名" @input="uname" v-model="username"   :class="nameWarn?'warnInput':''"></li>
            <p class="warn" v-if="nameWarn">{{nameWarn}}</p>
            <router-link tag="li" :to="{name:'addDetail'}"><input type="text" placeholder="小区/写字楼/学校等" :value="detail.name"></router-link>
            <li><input type="text" placeholder="请填写详细送餐地址" @input="uaddress"  v-model="address"  :class="addressWarn?'warnInput':''"></li>
            <p class="warn" v-if="addressWarn">{{addressWarn}}</p>
            <li><input type="text" placeholder="请填写能够联系到您的手机号" @input="uphone"  v-model="phone"  :class="telWarn?'warnInput':''"></li>
            <p class="warn" v-if="telWarn">{{telWarn}}</p>
            <li><input type="text" placeholder="备用联系电话（选填）" @input="uxphone"  v-model="xphone"  :class="xtelWarn?'warnInput':''"></li>
            <p class="warn" v-if="xtelWarn">{{xtelWarn}}</p>
        </ul>
        <div class="btn"><button @click="NewAddress" :class="white?'white':''">新增地址</button></div>

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
            detail:"",
            nameWarn:"",
            addressWarn:"",
            telWarn:"",
            xtelWarn:"",
            username:"",
            address:"",
            phone:"",
            xphone:"",
            white:false,
            warn:""
        }
    },
    mounted(){
        this.detail=this.$store.state.detail
        
    },
    methods:{
        NewAddress(){
            let data={
                address:this.address,
                address_detail:this.detail.name,
                geohash:this.detail.geohash,
                name:this.username,
                phone:this.phone,
                phone_bk:this.xphone,
                poi_type:0,
                sex:1,
                tag:"公司",
                tag_type:4,
            }
            let user_id=localStorage.getItem('user_id');
            this.axios.post("http://elm.cangdu.org/v1/users/"+user_id+"/addresses",data)
            .then(res=>{
                if(res.data){
                    if(res.data.status===0){
                        this.warn=res.data.message
                    }else{
                        this.$router.push({name: 'address'})
                    }
                }
            })
        },
        times(){
            this.warn=''
        },
        uname(e) {
            if(e.target.value===""){
                this.nameWarn="请填写您的姓名"
            }else{
                this.nameWarn=""
            }

            if(this.nameWarn===''&&this.addressWarn===''&& this.telWarn===''&&this.xtelWarn===''){
                this.white=true
            }else{
                this.white=false
            }
        },
        uaddress(e){
            if(e.target.value.length<3){
                this.addressWarn="送餐地址太短了，不能辨识"
            }else{
                this.addressWarn=""
            }

            if(this.nameWarn===''&&this.addressWarn===''&& this.telWarn===''&&this.xtelWarn===''){
                this.white=true
            }else{
                this.white=false
            }
        },
        uphone(e){
            let telBool=/^1[3456789]\d{9}$/.test(e.target.value);
            if(e.target.value===""){
                this.telWarn="手机号不能为空"
            }else if(!telBool){
                this.telWarn="请输入正确的手机号"
            }else{
                this.telWarn=""
            }

            if(this.nameWarn===''&&this.addressWarn===''&& this.telWarn===''&&this.xtelWarn===''){
                this.white=true
            }else{
                this.white=false
            }
        },
        uxphone(e){
            let telBool=/^1[3456789]\d{9}$/.test(e.target.value);
            if(e.target.value===""){
                this.xtelWarn=""
            }else if(!telBool){
                this.xtelWarn="请输入正确的手机号"
            }else{
                this.xtelWarn=""
            }

            if(this.nameWarn===''&&this.addressWarn===''&& this.telWarn===''&&this.xtelWarn===''){
                this.white=true
            }else{
                this.white=false
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.add{
    width:100%;
    height:100%;
    .form{
        width:100%;
        background-color: #fff;
        padding: 0.1rem;
        margin-top: 0.2rem;
        li{
            width:100%;
            padding: 0.1rem ;
            input{
                width:100%;
                padding-left: 0.1rem;
                background-color: #F2F2F2;
                border:0.01rem solid #DDDDDD;
                border-radius: 0.07rem;
            }
            .warnInput{
                border:0.01rem solid #EA3106;
            }
        }
        .warn{
            font-size: 0.2rem;
            color:#EA3106;
            padding-left: 0.2rem;
        }
    }
    .btn{
        width:100%;
        padding: 0.2rem;
        button{
            width:100%;
            background-color: #4CD964;
            padding: 0.15rem;
            border-radius: 0.07rem;
            color:#B6EFC0;
        }
        .white{
            color:#fff;
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
  from, 20%, 40%, 60%, 80%, to {
    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }

  0% {
    opacity: 0;
    -webkit-transform: scale3d(.3, .3, .3);
    transform: scale3d(.3, .3, .3);
  }
  
  20% {
    -webkit-transform: scale3d(.8, .8, .8);
    transform: scale3d(.8, .8, .8);
  }

  40% {
    -webkit-transform: scale3d(.9, .9, .9);
    transform: scale3d(.9, .9, .9);
  }

  60% {
    opacity: 1;
    -webkit-transform: scale3d(1.1, 1.1, 1.1);
    transform: scale3d(1.1, 1.1, 1.1);
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
