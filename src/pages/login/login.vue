<template>
  <div>
      <v-header title="登录" :register="true"></v-header>
      <div class="box">
          手机号: <input type="text" v-model="user.phone">
      </div>
      <div class="box">
          密码: <input type="text" v-model="user.password">
      </div>
      <div class="login" @click="login">登录</div>
  </div>
</template>

<script>
import { reqLogin } from '../../request'
export default {
    data() {
        return {
            user:{
              phone:"",
              password:"",
            }
        }
    },
    methods: {
      login(){
        reqLogin(this.user).then(res=>{
          if(res.data.code == 200){
            localStorage.setItem("userInfo",JSON.stringify(res.data.list))
            this.$toast("登陆成功")
            this.$router.push('/index')
          }else{
            this.$toast(res.data.msg)
          }
        })
      }
    },
}
</script>

<style scoped>
    .box{
        margin: 0.5rem 0;
        padding: 0.1rem;
        display: flex;
        border-bottom: 1px solid #000;
        font-size: .2rem;
    }
    .login{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        background-color: green;
        color: #fff;
        font-size: 0.25rem;
    }
    .box input{
        flex: 1;
        margin-left: .25rem;
    }
</style>