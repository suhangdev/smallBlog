<template>
  <div>
    <div class="edit">
      <el-input class="title" v-model="title" placeholder="请输入标题"></el-input>
      <el-input class="imgurl" v-model="img" placeholder="输入图片外链"></el-input>
      <el-input
        class="gist"
        type="textarea"
        :rows="4"
        placeholder="请输入简介"
        v-model="gist">
      </el-input>
      <div class="markdown">
        <textarea
          class="markdownInput"
          placeholder=""
          v-model="content"
          @input="update">
        </textarea>
        <div class="markdownCompiled" v-html="compiledMarkdown()"></div>
      </div>
      <div class="btn">
        <el-button type="primary" @click="saveArticle">保存</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import marked from 'marked'
  import hightlight from 'highlight.js'
  import '../../assets/atom-one-light.css'
  marked.setOptions({
    hightlight: function (code) {
      return hightlight.hightlightAuto(code).value
    }
  })
  export default {
    name: 'articleEdit',
    data() {
      return {
        title: '',
        date: '',
        content: '',
        gist: '',
        img: ''
      }
    },
    mounted: function () {
      if (this.$route.params.id) {
        this.$http.get('/api/articleDetail/' + this.$route.params.id).then(
          response => {
            let article = response.body
            this.title = article.title
            this.date = article.date
            this.content = article.content
            this.gist = article.gist
            this.img = article.img
          },
          response => console.log(response)
        )
      }
    },
    methods: {
      // 编译Markdown
      compiledMarkdown: function () {
        return marked(this.content, {sanitize: true})
      },
      // 延时赋值给content
      update: _.debounce(function (e) {
        this.content = e.target.value
      }, 300),
      // 获取发表时间
      getDate: function () {
        let mydate, y, m, d, hh, mm, ss;
        mydate = new Date()
        y = mydate.getFullYear()
        m = mydate.getMonth() + 1
        d = mydate.getDate()
        hh = mydate.getHours()
        mm = mydate.getMinutes()
        ss = mydate.getSeconds()
        if (m < 10) m = '0' + m
        if (d < 10) d = '0' + d
        if (hh < 10) hh = '0' + hh
        if (mm < 10) mm = '0' + mm
        if (ss < 10) ss = '0' + ss
        this.date = y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      },
      // 保存文章
      saveArticle: function () {
        let self = this
        if (this.title.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入标题',
            type: 'warning'
          })
          return
        }
        if (this.content.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入内容',
            type: 'warning'
          })
          return
        }
        if (this.img.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入图片外链',
            type: 'warning'
          })
          return
        }
        if (this.gist.length === 0) {
          this.$notify({
            title: '提醒',
            message: '请输入简介',
            type: 'warning'
          })
          return
        }
        if (this.$route.params.id) {
          // 更新文章
          let obj = {
            _id: this.$route.params.id,
            title: this.title,
            date: this.date,
            content: this.content,
            gist: this.gist,
            img: this.img
          }
          this.$http.post('/api/admin/updateArticle', {
            articleInformation: obj
          }).then(
            response => {
              self.$message({
                message: '更新文章成功',
                type: 'success'
              })
              // 更新完成后跳转至该文章的详情页
              self.$router.push('/articleDetail/' + self.$route.params.id)
            },
            response => console.log(response)
          )
        } else {
          // 新建文章
          // 获取时间
          this.getDate()
          let obj = {
            title: this.title,
            date: this.date,
            content: this.content,
            gist: this.gist,
            img: this.img
          }
          this.$http.post('/api/admin/saveArticle', {
            articleInformation: obj
          }).then(
            response => {
              self.$message({
                message: '发表文章成功',
                type: 'success'
              })
              // 保存成功后跳转至文章列表页
              self.refreshArticleList()
            },
            response => console.log(response)
          )
        }
      },
      // 保存成功后跳转至文章列表页
      refreshArticleList: function () {
        this.$router.push('/admin/articleList')
      },
      goBack: function () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped>
  .edit{
    max-width: 800px;
    margin: 0 auto;
  }
  .title{
    padding: 30px 0 0 0;
  }
  .imgurl{
    padding: 30px 0 0 0;
  }
  .gist{
    padding: 30px 0;
  }
  .markdown {
    text-align: left;
    border: 1px solid #bfcbd9;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    width: 100%;
    height: 500px;
    vertical-align: top;
    background: #f5f7f9;
    overflow: hidden;
  }

  .markdown textarea {
    border: none;
    resize: none;
    outline: none;
  }

  .markdownInput {
    float: left;
    display: inline-block;
    width: 49%;
    height: 98%;
    background-color: white;
    padding-left: 1%;
    padding-top: 1%;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .markdownCompiled {
    overflow: auto;
    float: right;
    display: inline-block;
    width: 49%;
    height: 100%;
    padding: 5px 0 5px 1%;
  }

  .btn{
    padding: 30px 0;
  }
  @media screen and (max-width: 640px){
    .markdown{
      height: 300px;
      font-size: 16px;
    }
    .edit{
      max-width: 640px;
      margin: 0 auto;
    }
  }
</style>
