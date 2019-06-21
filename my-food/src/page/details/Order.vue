<template>
  <div class="order">
        <head-top headTitle="确认订单" :goback="true" :signinUp="true" >

        </head-top>
       
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
           
        }
    },
    methods: {
        
    },
    mounted(){
        
    }
}
</script>

<style lang="scss" scoped>
    .order{
        width:100%;
        height:100%;
        display: flex;
        flex-direction: column;
    }
</style>
