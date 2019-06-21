<template>
    <div class="addDetail">
        <head-top headTitle="搜索地址" :goback="true" class="header" :signinUp="false" >

        </head-top>
        <div class="content">
            <div class="search">
                <input type="text" placeholder="请输入小区/写字楼/学校等" ref="word" :value="address"  @keyup.enter="onSearch">
                <button @click="onSearch">确认</button>
            </div>
            <p>为了满足商家的送餐要求，建议您从列表中选择地址</p>
            <ul class="list" v-if="list.length>0">
                <li v-for="(item,index) in list" @click="Detail(item)">
                    <p>{{item.name}}</p>
                    <p>{{item.address}}</p>
                </li>
            </ul>
            <div class="p" v-else>
                <p>找不到地址？</p>
                <p>请尝试输入小区、写字楼或学校名</p>
                <p>详细地址（如门牌号）可稍后输入哦。</p>
            </div>
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
            list:[],
            address:""
        }
    },
    mounted(){
        this.address=this.$store.state.detail.name
    },
    methods:{
        onSearch(){
            this.axios.get("http://elm.cangdu.org/v1/pois?type=nearby&keyword="+this.$refs.word.value)
            .then(res=>{
                if(res.data){
                    this.list=res.data
                }
            })
        },
        Detail(item){
            // console.log(item)
            this.$store.commit('addDetail',item)
            this.$router.push({name: 'add'})
        }
    }
}
</script>

<style lang="scss" scoped>
.addDetail{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    .content{
        flex:1;
        overflow: auto; 
        &>p{
            text-align: center;
            color:#FF883F;
            background-color: #FFF6E4;
            padding: 0.07rem 0;
        }
        .search{
            width:100%;
            background-color: #fff;
            padding: 0.2rem ;
            display: flex;
            input{
                background-color: #F2F2F2;
                border:0.01rem solid #DDDDDD;
                border-radius: 0.07rem;
                padding-left: 0.2rem;
                width:80%;
            }
            button{
                margin-left: 0.1rem;
                background-color: #3199E8;
                border-radius: 0.1rem;
                color:#fff;
                width:1.2rem;
            }
        }
    
        .p{
            text-align: center;
            font-size: 0.28rem;
            color:#969696;
            margin-top: 2.5rem;
            p{
                padding: 0.1rem 0;
            }
        }
        .list{
            width:100%;
            color:#969696;
            li{
                padding: 0.2rem;
                border-bottom:0.01rem solid #CCCCCC;
                p{
                    white-space: nowrap;
                    overflow:hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
