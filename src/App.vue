<template>
  <div id="app">
    <div class="black_line"></div>
    <div id="main">
      <blogHead></blogHead>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import blogHead from './components/blogHead.vue'
  export default {
    name: 'app',
    components: {
      blogHead
    }
  }
</script>

<style>
  #app {
    height: 100%;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background: url("../static/background.png") no-repeat;
    background-size: 100% 920px;
    position: absolute;
  }

  @media screen and (max-width: 640px){
    #app{
      background-size: 640px 920px;
    }
  }
</style>
