<template>
  <div id="signin">
    <h1>login</h1>
    <el-input class="name" v-model="name" placeholder="请输入用户名"></el-input>
    <el-input class="psw" v-model="password" placeholder="请输入密码" type="password"></el-input>
    <!--
    <el-button @click="signup" size="large">注册</el-button>
    -->
    <el-button id="login" type="primary" @click="signin" size="large">登录</el-button>
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
        /*
      signup: function () {
        let that = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符');
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符');
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (response.body.name === that.name) {
              that.$message.error('该用户已存在');
              that.name = '';
            } else {
              let obj = {
                name: that.name,
                password: that.password
              };

              that.$http.post('/api/admin/signup', {
                userInfo: obj
              }).then(
                response => {
                  that.$message({
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
      */
      signin: function () {
        let that = this;
        if (this.name.length < 6) {
          this.$message.error('用户名不能为空或小于六个字符');
          return
        }

        if (this.password.length < 6) {
          this.$message.error('密码不能为空或小于六个字符');
          return
        }

        this.$http.get('/api/admin/getUser/' + this.name).then(
          response => {
            if (that.password !== response.body.password) {
              that.$message.error('用户名或密码不正确')
            } else {
              let obj = {
                name: that.name,
                password: that.password
              };
              that.$http.post('/api/admin/signin', {
                userInfo: obj
              }).then(
                response => {
                  that.$message({
                    message: '登录成功',
                    type: 'success'
                  });
                  delete that.password;
                  sessionStorage.setItem('username',that.name);
                  that.$router.push({path: '/'});
                },
                response => console.log('登录失败'+response)
              )
            }
          },
          response => {
            that.$message.error('该用户不存在');
            return
          }
        )
      }
    }
  }
</script>

<style scoped>
#signin{
  max-width: 300px;
  margin: 0 auto;
  margin-top: 100px;
  animation: cont 1s;
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
#login{
  width: 300px;
  border-radius: 20px;
}
/*#signin button{
  margin: 0 20px;
}
*/
@keyframes cont {
  from {opacity: 0; transform: translateY(300px);}
}

@media screen and (max-width: 640px){
  #signin{
    margin-top: 50px;
  }
}
</style>
