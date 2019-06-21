<template>
    <div class="address">
        <head-top headTitle="编辑地址" :goback="true" class="header" :signinUp="false" >
             <p slot="address" @click="onChange">{{show?'完成':'编辑'}}</p>
        </head-top>
        <div class="content">
            <ul>
                <li v-for="item in list">
                    <p>{{item.address}}</p>
                    <p>{{item.phone}}</p>
                    <span v-if="show" @click="Delete(item.id)">&times;</span>
                </li>
            </ul>
        </div>
        <router-link tag="div" :to="{name:'add'}" class="new">新增地址 <div class="right"><i class="fa fa-fw fa-angle-right"></i></div></router-link>
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
            show:false
        }
    },
    mounted(){
        let user_id=localStorage.getItem('user_id');
        this.axios.get("http://elm.cangdu.org/v1/users/"+user_id+"/addresses")
        .then(res=>{
            if(res.data){
                this.list=res.data.reverse()
            }
        })
    },
    methods:{
        onChange(){
            this.show=!this.show
        },
        Delete(id){
            this.axios.delete("http://elm.cangdu.org/v1/users/29005/addresses/"+id)
            .then(res=>{
                if(res.data){
                    let user_id=localStorage.getItem('user_id');
                    this.axios.get("http://elm.cangdu.org/v1/users/"+user_id+"/addresses")
                    .then(res=>{
                        if(res.data){
                            this.list=res.data
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .address{
        width:100%;
        height:100%;
        .new{
            background-color: #fff;
            padding: 0.2rem 0 0.2rem  0.3rem;
            border-bottom:0.01rem solid #DDDDDD;
            border-top:0.01rem solid #DDDDDD;
            margin-top: 0.2rem;
            .right{
                font-size: 0.45rem;
                color:#D8D8D8;
                i{
                    margin-top:-0.05rem; 
                }
            }
        }
        .content{
            width:100%;
            ul{
                width:100%;
                background-color: #fff;
                margin-top: 0.2rem;
                li{
                    padding: 0.2rem;
                    border-bottom:0.01rem solid #DDDDDD;
                    position: relative;
                    &:nth-of-type(1){
                        background-color: #FFF8C3;
                        border-top:0.01rem solid #DDDDDD;

                    }
                    span{
                        font-size: 0.4rem;
                        color:#999999;
                        position:absolute;
                        right:0.3rem;
                        top:0.35rem;
                    }
                }
            }
        }
    }
</style>
