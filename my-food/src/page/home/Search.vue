<template>
    <div class="seach">
        <head-top :goback="true" :signinUp="false"  :headTitle="'搜索'" >

        </head-top>
        <div class="center2">
            <p class="ss">
                <input type="text" placeholder="请输入商家或美食名称" v-model="food" @input="Null" @keyup.enter="addSearch">
                <span @click="del" v-if="items"><img src="../../images/333.png"></span>
                <input type="submit" value="提交" @click="addSearch">
            </p>
            <div class="shop" v-if="shopList.length>0">
                <p>商家</p>
                <ul>
                    <li v-for="item in shopList">
                        <div class="left"><img :src="'http://elm.cangdu.org/img/'+item.image_path" alt=""></div>
                        <div class="rigth">
                            <p>{{item.name}}</p>
                            <p>月售 {{item.recent_order_num}} 单</p>
                            <p>{{item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>

                        </div>
                    </li>
                </ul>
            </div>
            <div class="history" v-else>
                <div v-if="this.food&&show" class="sorry">很抱歉！无搜索结果</div>
                <div v-else>
                    <p v-if="searchHistory.length>0" class="p">搜索历史</p>
                    <ul>
                        <li v-for="(item,index) in searchHistory"><p @click="clk">{{item}}</p><span @click="delSearch(index)">&times;</span></li>
                    </ul>
                    <button @click="allDel" v-if="searchHistory.length>0">清空搜索历史</button>
                </div>
                
            </div>
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
            food:"",
            items:false,
            shopList:[],
            searchHistory:[],
            show:false,
        }
    },
    mounted(){
        if(localStorage.getItem('searchHistory')){
            this.searchHistory=JSON.parse(localStorage.getItem('searchHistory'))
        }else{
            this.searchHistory=[]
        }
        
    },
    methods:{
        del(){
            this.food=""
        },
        addSearch(){
            let geohash=sessionStorage.getItem("geohash")
            this.axios.get("http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash="+geohash+"&keyword="+this.food+"&type=search")
            .then(res=>{
                if(res.data){
                    if(res.data.status==0){
                        this.show=true
                    }else{
                        this.shopList=res.data
                        this.show=false
                    }
                    
                }
            })
            this.add()
        },
        add(){
            let history=localStorage.getItem('searchHistory')
            //去重
            if(history){
                let checkrepeat=false;
                this.searchHistory=JSON.parse(history);
                this.searchHistory.map(i=>{
                    if(i==this.food){
                        checkrepeat=true
                    }
                })
                if(checkrepeat==false){
                    this.searchHistory.push(this.food)
                    localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory)); //对象转字符串
                }
            }else{
                this.searchHistory.push(this.food)
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory)); //对象转字符串
            }
        },
        delSearch(index){
            this.searchHistory.splice(index,1)
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory)); //对象转字符串
        },
        allDel(){
            localStorage.removeItem('searchHistory')
            this.searchHistory=[]
        },
        Null(e){
            if(e.target.value==""){
                this.shopList=[]
            }
        },
        clk(e){
            this.food=e.target.innerHTML
            if(this.food!=""){
                this.items=true;
            }else{
                this.items=false;
            }
            this.addSearch()
        }
    }
}
</script>

<style lang="scss" scoped>
    .seach{
        background-color: #F5F5F5;
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .center2{
            width:100%;
            flex:1;
            overflow: auto;
            .ss{
                background-color: #fff;
                display: flex;
                padding: 0.15rem;
                span{
                    img{
                        width:0.25rem;
                        margin-left: -0.6rem;
                        margin-top: 0.18rem;
                    }
                }
                input:nth-of-type(1){
                    margin-right: 0.2rem;
                    width:4.8rem;
                    height:0.6rem;
                    font-size: 0.26rem;
                    font-weight: bold;
                    background-color: #F2F2F2;
                    border-radius: 0.05rem;
                    border:none;
                    border:0.01rem solid #E4E4E4;
                    outline: none;
                    padding-left: 0.2rem;
                    &::placeholder{
                        color:#757575;
                    }
                }
                input:nth-of-type(2){
                    width:1.43rem;
                    height:0.6rem;
                    font-size: 0.28rem;
                    font-weight: bold;
                    color:#fff;
                    outline: none;
                    background-color: #3792E5;
                    border:none;
                    border-radius: 0.05rem;
                }
            }
            .sorry{
                text-align: center;
                background-color: #fff;
                margin-top: 0.03rem;
                padding: 0.2rem 0;
            }
            .history{
                
                .p{
                    font-size: 0.26rem;
                    color:#666666;
                    padding: 0.15rem 0.1rem;
                }
                ul{
                    list-style: none;
                    font-size: 0.28rem;
                    background-color: #fff;
                    li{
                        border-bottom:0.01rem solid #E4E4E4;
                        position:relative;
                        padding: 0.15rem;
                        display: flex;
                        p{
                            flex:3;
                        }
                        span{
                            flex:1;
                            font-size:0.3rem ;
                            color:#999999;
                            font-weight: bold;
                            text-align: right;
                        }
                    }
                }
                button{
                    padding: 0.18rem;
                    width:100%;
                    font-size:0.28rem ;
                    font-weight: bold;
                    background-color: #fff;
                    color:#3792E5;
                    border:none;
                    outline: none;
                }
            }
            .shop{
                width:100%;
                &>p{
                    font-size: 0.26rem;
                    color:#666666;
                    padding: 0.15rem 0.1rem;
                }
                ul{
                    width:100%;
                    background-color: #fff;
                    li{
                        width:100%;
                        display: flex;
                        border-bottom:0.01rem solid #E4E4E4;
                        padding: 0.2rem;
                        .left{
                            flex:1;
                            img{
                                width:0.7rem;
                            }
                        }
                        .rigth{
                            flex:7;
                            border-bottom:0.01rem solid #E4E4E4;
                            padding-bottom: 0.1rem;
                            p{
                                font-size: 0.24rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
