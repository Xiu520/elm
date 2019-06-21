<template>
    <div class="son1">
        <ul>
            <li @click="Take"><i class="fa fa-fw fa-snowflake-o"></i><p>外卖</p></li>
            <li @click="Search"><i class="fa fa-fw fa-eercast"></i><p>搜索</p></li>
            <router-link tag="li" to="/indent"><i class="fa fa-fw fa-file-o"></i><p>订单</p></router-link>
            <router-link tag="li" to="/user"><i class="fa fa-fw fa-user-o"></i><p>我的</p></router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            geohash:""
        }
    },
    mounted(){
        this.geohash=sessionStorage.getItem("geohash")
    },
    methods:{
        Take(){
            this.$router.push({ name: "take",params:{geohash:this.geohash}});
        },
        Search(){
            this.$router.push({ name: "search",params:{geohash:this.geohash}});
        }
    }
}
</script>

<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .son1{
        width:100%;
        height:0.9rem;
        font-size: 0.24rem;
        color:#7D7D7D;
        background-color: #fff;
        ul{
            width:100%;
            height:0.9rem;
            display: flex;
            list-style: none;
            padding: 0.06rem 0;
            border-top:0.01rem solid #F0F0F0;
            li{
                flex:1;
                text-align: center;
                i{
                    font-size: 0.35rem;
                }
            }
        }
    }
</style>
