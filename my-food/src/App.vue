<template>
  <div id="app">
    <div class="content">
      <transition name="router-fade" mode="out-in">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </transition>
    </div>
    
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" >
  @import './style/common'; //在css样式中在引入css样式
  .router-fade-enter-active,.router-fade-leave-active{
    transition: opacity 0.3s;
  }
  .router-fade-enter,.router-fade-leave-active{
    opacity:0;
  }
  
  html,body,#app{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
  }
  .content{
    width:100%;
    flex:1;
    overflow: auto;
  } 
  
</style>
