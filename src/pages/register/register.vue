<template>
  <div>
      <v-header title="注册" :back="true"></v-header>
      <div class="box">
          手机号: <input type="text" v-model="user.phone">
      </div>
      <div class="box">
          用户名: <input type="text" v-model="user.nickname">
      </div>
      <div class="box">
          密码: <input type="text" v-model="user.password">
      </div>
      <div class="register" @click="register">注册</div>
  </div>
</template>

<script>
import { reqRegister } from '../../request'
export default {
    data() {
        return {
            user:{
              phone:"",
              nickname:"",
              password:"",
            }
        }
    },
    methods: {
      register(){
        if(this.user.phone==='' || this.user.nickname==='' || this.user.password===''){
          alert("所有都不能为空")
        }
        reqRegister(this.user).then(res=>{
          if(res.data.code == 200){
            this.$router.replace('/login')
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
    .register{
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