<template>
  <div class="vheader">
      <div class="back" v-if="back" @click="$router.go(-1)">返回</div>
      <h3>{{title}}</h3>
      <div class="register" v-if="register" @click="$router.push('/register')">注册</div>
  </div>
</template>

<script>
export default {
    props:["title","back","register"]
}
</script>

<style scoped>
    .vheader{
        width: 100%;
        height: .8rem;
        line-height: .8rem;
        background-color: #ff6445;
        color: #f1f1f1;
        font-size: 0.25rem;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10;
        /* margin-bottom: .5rem; */
    }
    .vheader .back{
        position: absolute;
        left: 0.2rem;
        top: 0;
        z-index: 10;
    }
    .vheader h3{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        text-align: center;
        top: 0;
        z-index: 1;
    }
    .vheader .register{
        position: absolute;
        right: 0.2rem;
        top: 0;
        z-index: 10;
    }
</style>