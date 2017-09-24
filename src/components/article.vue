<template>
  <div id="list">
    <ul>
      <li v-for="item in articleList" @click="articleDetail(item._id)">
        <img :src="item.img">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="date">
            <span>{{item.date}}</span>
          </div>
        </div>
        <div class="gist">{{item.gist}}</div>
      </li>
    </ul>
  </div>
</template>


<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: []
      }
    },
    mounted: function () {
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      articleDetail: function (id) {
        this.$router.push('/articleDetail/' + id)
      }
    }
  }
</script>

<style scoped>
#list{
  margin: 0 auto;
  max-width: 1232px;
}
#list ul{
  height: 100%;
}
#list li{
  display: inline-block;
  text-align: left;
  width: 300px;
  height: 400px;
  background-color: #fff;
  margin: 0 4px 16px;
  border-radius: 4px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2),
  0 2px 2px rgba(0, 0, 0, .14),
  0 3px 1px -2px rgba(0, 0, 0, .12);
  cursor: pointer;
  transition: all .4s cubic-bezier(.25,.8,.25,1);
  transition-property: box-shadow;
  overflow: hidden;
  animation: see1 1s;
}
#list li:hover {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2),
  0 8px 10px 1px rgba(0, 0, 0, .14),
  0 3px 14px 2px rgba(0, 0, 0, .12);
}
#list li img {
  width: 100%;
  height: 168px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.info{
  padding: 24px 16px 16px 16px;
}
.title{
  font-size: 24px;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 400;
  text-overflow : ellipsis;
  overflow: hidden;
}
.date{
  opacity: .54;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .01em;
  font-weight: 400;
}

.gist{
  opacity: .54;
  height: 87px;
  text-align: left;
  padding: 0 16px 24px 16px;
  font-size: 14px;
  line-height: 22px;
  word-wrap: break-word;
  word-break: keep-all;
  overflow: hidden;
}
@keyframes see1{
  from {opacity: 0; transform: translateX(50px);}
  to {opacity: 1}
}

@keyframes see2{
  from {opacity: 0; transform: translateY(-50px);}
  to {opacity: 1}
}

@media screen and (max-width: 400px){
  #list li{
    width: 300px;
    animation: see2 1s;
  }

}
</style>
