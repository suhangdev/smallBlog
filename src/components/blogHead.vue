<template>
  <div>
    <div id="nav">
      <ul>
        <router-link to="/">
          <li><span>Blog</span></li>
        </router-link>
        <router-link to="/admin/articleEdit">
          <li><span>Write</span></li>
        </router-link>
        <router-link to="/admin/articleList">
          <li><span>Manage</span></li>
        </router-link>
        <router-link to="/about">
          <li><span>About</span></li>
        </router-link>
      </ul>
    </div>
    <div id="logo">
      <img src="../../static/welcome.png">
    </div>
  </div>
</template>

<script>
  export default{
    name: 'blogHead'
  }
</script>

<style scoped>
  #nav{
    position: fixed;
    margin-top: -100px;
    font-size: 16px;
    width: 100%;
    height: 50px;
    background-color: #231f20;
    text-align: center;
    z-index: 10;
  }
  #nav ul{
    margin: 0 auto;
    width: 560px;
  }
  #nav li{
    float: left;
    text-align: center;
    line-height: 50px;
    font-weight: 600;
    animation: see 1s;
  }

  #nav span{
    display: block;
    width: 140px;
    color: #ecebe7;
    transition: all .5s cubic-bezier(.25,.8,.25,1);
  }
  #nav span:focus{
    background-color: #ecebe7;
    color: #54c2ef;
  }

  #nav span:hover{
    color: #54c2ef;
  }
  #logo{
    margin: 100px 0;
  }
  #logo img{
    height: 130px;
    width: 556px;
    margin-left: 20px;
    animation: welcome 1s;
  }
  @keyframes welcome {
    from {opacity: 0;transform: translateY(-50px);}
    to {opacity: 1;}
  }
  @keyframes see{
    from {opacity: 0; transform: translateX(50px);}
    to {opacity: 1}
  }
@media screen and (max-width: 640px){
    #logo{
      margin: 80px 0 40px 0;
    }

    #logo img{
      height: 50px;
      width: 250px;
      animation: welcome 2s;
    }

    #nav{
      margin-top: -80px;
    }
    #nav ul{
      width: 320px;
    }
    #nav span{
      width: 75px;
    }
}

</style>
