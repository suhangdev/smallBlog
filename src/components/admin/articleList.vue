<template>
  <div id="list">
    <ul>
      <li v-for="item in articleList">
        <img :src="item.img">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="date">
            <span>{{item.date}}</span>
          </div>
        </div>
        <div class="gist">{{item.gist}}</div>
        <div class="btn">
          <el-button class="revise" type="info" @click="articleEdit(item._id)">修改</el-button>
          <el-button class="delete" type="danger" @click="deleteArticle(item._id)">删除</el-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'article',
    data() {
      return {
        articleList: [],
      }
    },
    mounted: function () {
      // 获取文章列表
      this.$http.get('/api/articleList').then(
        response => this.articleList = response.body.reverse(),
        response => console.log(response)
      )
    },
    methods: {
      // 跳转至文章编辑页
      articleEdit: function (id) {
        this.$router.push('/admin/articleEdit/' + id)
      },
      // 删除文章
      deleteArticle: function (id) {
        let self = this
        this.$confirm('删除该文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post('/api/admin/deleteArticle', {
            _id: id
          }).then(
            response => {
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              self.fetchData()
            },
            response => {
              console.log(response)
            }
          )
        });
      },
      // 更新数据
      fetchData: function () {
        this.$http.get('/api/articleList').then(
          response => this.articleList = response.body.reverse(),
          response => console.log(response)
        )
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
    height: 450px;
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
  .btn{
    height: 50px;
    text-align: center;
    vertical-align: middle;
    padding-top: 20px;
  }

  .revise{
    margin-right: 20px;
  }

  .delete{
    margin-left: 20px;
  }
  @media screen and (max-width: 400px){
    #list li{
      width: 300px;
    }
  }
</style>
