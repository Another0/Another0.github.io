<template>
  <div class="login" :style="bgStyle">
    <el-row>
      <el-col>
        <!-- <img class="login-logo" src="/static/image/logo.png"> -->
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="4">
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="userAcc" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="userPassword" placeholder="请输入密码"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="login">登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      width: 0,
      height: 0,
      userAcc: '',
      userPassword: '',
      userId: null
    }
  },
  mounted () {
    // document.addEventListener('keydown', (event) => {
    //     if (event.keyCode === 13) {
    //         this.login()
    //     }
    // })
    this.sizes(),
    $(window).resize(() => {
        this.sizes()
    })
  },
  computed: {
    bgStyle () {
      return {
        width: this.width+"px",
        height: this.height+"px"
      }
    }
  },
  methods: {
    sizes() {
        this.width = $(window).width(),
        this.height = $(window).height()
    },
    login () {
      if (this.userAcc === '' || this.userAcc === undefined) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
      } else if (this.userPassword === '' || this.userPassword === undefined) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
      } else {
        axios.post('/api/login', {
          account: this.userAcc,
          password: this.userPassword
        }).then((resp) => {
          this.loginChange(resp.data)
        })
      }
    },
    loginChange (data) {
      if (data.account) {
        this.$store.commit('setUserAcc', data.account)
        this.$store.commit('setImgSrc', data.imgsrc)
        this.$store.commit('setNickName', data.nickname)
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.push({
            path: 'index',
            name: 'index',
            params: { userId: data.userId }
          })
      } else {
          this.$message.error('登陆失败')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login {
    background-size: 100% 100%;
    background-image: url('/static/image/logo.png');
  }
  @component-namespace login {
    @b logo {
      width: 100px;
      height: 80px;
    }
  }
</style>
