<template>
  <div class="indent">
        <head-top headTitle="订单列表" :goback="true" :signinUp="false" >

        </head-top>
        <div class="content">
            <ul class="left-waterfall" ref="left">
                <li class="item" v-for="(item,index) in leftItems" >
                    <!-- <span>{{index}}</span> -->
                    <img src="../../images/1.png" alt="">
                    <img :src="item.url"/>
                </li>
            </ul>
            <ul class="right-waterfall" ref="right">
                <li class="item" v-for="(item,index) in rightItems" :style="{height:item.height+'px'}">
                    <!-- <span>{{index}}</span> -->
                    <img :src="item.url"/>
                </li>
            </ul>
        </div>
        <!-- 底部 -->
        <foot-bottom></foot-bottom>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import footBottom from '../../components/footer/ComFooter'
export default {
    components:{
        headTop,
        footBottom,
    },
    data(){
        return{
            data:[
                {url:"../../images/1.png"},
                {url:"../../images/2.png"},
                {url:"../../images/3.png"},
                {url:"../../images/4.png"},
                {url:"../../images/5.png"},
                {url:"../../images/6.png"},
                {url:"../../images/7.png"},
                {url:"../../images/8.png"},
                {url:"../../images/9.png"},
                {url:"../../images/10.png"},
            ],
            leftItems:[],
            rightItems:[]
        }
    },
    methods: {
        updataWaterfall(){
            const leftHeight=this.$refs.left.clientHeight
            const rightHeight=this.$refs.right.clientHeight
            let item=this.data.shift()
            // console.log(item)
            if(item==null){
                return
            }
            if(leftHeight<=rightHeight){
                this.leftItems.push(item)
            }else{
                this.rightItems.push(item)
            }
            console.log(this.leftItems,this.rightItems)
            this.$nextTick(function(){
                this.updataWaterfall()
            })
        }
    },
    mounted(){
        this.updataWaterfall()
    }
}
</script>

<style lang="scss" scoped>
    .indent{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
        .content{
            width:100%;
            flex:1;
            overflow: auto;
            ul{
                width:40%;
                li{
                    margin-bottom:10px ;
                }
            }
            .left-waterfall{
                float:left;
            }
            .right-waterfall{
                float:right;
            }
        }
    }
</style>
