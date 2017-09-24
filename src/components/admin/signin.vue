<template>
  <div id="signin">
    <h1>登录</h1>
    <el-input class="name" v-model="name" placeholder="请输入用户名"></el-input>
    <el-input class="psw" v-model="password" placeholder="请输入密码" type="password"></el-input>
    <el-button @click="signup" size="large">注册</el-button>
    <el-button type="primary" @click="signin" size="large">登录</el-button>
  </div>
</template>

<script>
  export default {
    name: 'signin',
    data() {
      return {
        name: '',
        password: '',
        hasName: false
      }
    },
    methods: {
      signup: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (response.body.name === _this.name) {
              _this.$message.error('该用户已存在')
              _this.name = '';
              // 由于异步，name的改变比正常流执行得慢，所以不能通过判断name去执行是否post
              // 所以我把post移入else中，而不是在外面通过判断name执行
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }

              _this.$http.post('/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: '注册成功',
                    type: 'success'
                  })
                },
                response => console.log('注册失败' + response)
              )
            }
          },
          response => console.log(response)
        )
      },
      signin: function () {
        let _this = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符')
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符')
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (_this.password !== response.body.password) {
              _this.$message.error('用户名或密码不正确')
            } else {
              let obj = {
                name: _this.name,
                password: _this.password
              }
              _this.$http.post('/api/admin/signin', {
                userInfo: obj
              }).then(
                response => {
                  _this.$message({
                    message: '登录成功',
                    type: 'success'
                  })
                  delete _this.password;
                  _this.$router.go(-1)
                },
                response => console.log('登录失败'+response)
              )
            }
          },
          response => {
            _this.$message.error('该用户不存在')
            return
          }
        )
      }
    }
  }
</script>

<style scoped="">
#signin{
  max-width: 300px;
  margin: 0 auto;
  margin-top: 100px;
}

#signin h1{
  display: block;
  margin-bottom: 30px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
#signin input{
  display: block;
  margin-bottom: 25px;
}
.name{
  margin-bottom: 25px;
}
.psw{
  margin-bottom: 25px;
}
#signin button{
  margin: 0 20px;
}
@media screen and (max-width: 640px){
  #signin{
    margin-top: 50px;
  }
}
</style>
