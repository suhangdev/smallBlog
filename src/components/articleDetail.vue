<template>
  <div id="content">
    <div class="article">
      <div class="title">{{ article.title }}</div>
      <div class="date">{{ article.date }}</div>
      <div class="content" v-html="compiledMarkdown()"></div>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
  import highlight from 'highlight.js'
  import '../assets/atom-one-light.css'
  marked.setOptions({
    highlight: function (code) {
      return highlight.highlightAuto(code).value
    }
  })
  export default {
    name: 'articleDetail',
    data() {
      return {
        article: {}
      }
    },
    mounted: function () {
      let id = this.$route.params.id
      this.$http.get('/api/articleDetail/' + id).then(
        response => this.article = response.body,
        response => console.log(response)
      )
    },
    methods: {
      compiledMarkdown: function () {
        return marked(this.article.content || '', {sanitize: true})
      }
    }
  }
</script>

<style scoped>
#content{
  width: 800px;
  margin: 0 auto;
  text-align: center;
  animation: cont 1s;
}
.article{
  padding-bottom: 30px;
  text-align: left;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, .2),
  0 2px 2px rgba(0, 0, 0, .14),
  0 3px 1px -2px rgba(0, 0, 0, .12);
  background : url("../../static/bg.png") no-repeat;
  background-size: 100% 100%;
}
.title{
  padding: 30px 30px 10px 30px;
  font-size: 40px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  word-wrap: break-word;
  word-break: keep-all;
}
.date{
  padding: 10px 0 30px 35px;
  opacity: .54;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: .01em;
  font-weight: 400;
}
.content{
  padding: 0  30px;
}

@keyframes cont {
  from {opacity: 0; transform: translateY(300px);}
}
@media screen and (max-width: 800px){
  #content{
    margin: 0 auto;
    width: 600px;
  }
}
@media screen and (max-width: 700px){
  #content{
    margin: 0 auto;
    width: 500px;
  }
}
@media screen and (max-width: 600px){
  #content{
    margin: 0 auto;
    width: 400px;
  }
}
@media screen and (max-width: 500px){
  #content{
    margin: 0 auto;
    width: 300px;
  }
}
</style>
