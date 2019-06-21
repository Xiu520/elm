<template>
    <header id="head">
            <!-- logo部分 -->
            <slot name="logo" class="head_logo"></slot>
            <!-- 返回上一级 -->
            <section v-if="goback" class="head_back" @click='$router.go(-1)'>
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <polyline points="12,18 4,9 12,0" style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 2;"></polyline>
                </svg>
            </section>

        
            <!-- 标题 -->
            <section class="title_head ellipsis" v-if='headTitle'>
                <p class="title_text">{{headTitle}}</p>
            </section>
        
    
        
            <!-- 用户登录显示 -->
            <router-link :to="show? '/user':'/login'" v-if="signinUp" class="head_login">
                <span  class="login_src"  v-if="show"><i class="fa fa-fw fa-user-o"></i></span>
                <span class="login_span" v-else>登录|注册</span>
            </router-link>

            <!-- 切换城市 -->
            <slot name="changecity" class="title"></slot>

            <!-- 编辑 完成 -->
            <slot name="address" class="title"></slot>
        
    
    
    

  </header>
</template>


<script>
export default {
    props:['headTitle','goback','signinUp'],
    data(){
        return{
            show:false
        }
    },
    mounted(){
        let user_id=localStorage.getItem("user_id")
        if(user_id){
            this.show=true
        }else{
            this.show=false
        }
    }
};
</script>


<style lang="scss" scoped>
.head_login{
    flex:1;
    text-align: right;
    text-decoration: none;
    .login_span{
        font-size: 0.25rem;
        color: white;
    }
    .login_src{
        font-size: 0.35rem;
        color: white;
    }
}
.title_head{
    flex:2;
    padding-right: 1rem;
    .title_text{
        width:3rem;
        font-size: 0.35rem;
        font-weight: bold;
        color: white;
        white-space: nowrap;
        overflow:hidden;
        text-overflow: ellipsis;
    }
}
.head_back{
    flex:1;
    height: 0.5rem;
}
.head_logo{
    flex:1;
    width: 1rem;
    text-align: left;
}
header{
    width:100%;
    height:0.9rem;
    background-color: #3792E5;
    color:#fff;
    font-size: 0.32rem;
    text-align: center;
    line-height: 0.9rem;
    display: flex;
    align-items: center;
    padding: 0 0.2rem;
}
</style>