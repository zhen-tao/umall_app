<template>
  <div class="indexwrap">
    <router-view></router-view>
    <div class="footer">
      <router-link to="/index/mall" active-class="footerNav">商城</router-link>
      <router-link to="/index/cate" active-class="footerNav">分类</router-link>
      <router-link to="/index/shop" active-class="footerNav">购物车</router-link>
      <router-link to="/index/mine" active-class="footerNav">我的</router-link>
    </div>
  </div>
</template>

<script>
export default {
 
};
</script>

<style scoped>
.indexwrap {
  width: 100vw;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  padding-bottom: .8rem;
  /* overflow: hidden; */
}

.footer {
  display: flex;
  background: #ffffff;
  width: 100%;
  height: 0.8rem;
  box-shadow: 0 -0.05rem 0.1rem 0 rgba(204, 204, 204, 0.2), 0 0 0 0 #cccccc;
  position: fixed;
  bottom: 0rem;
  left: 0;
  z-index: 100;
}
a {
  
  flex: 1;
  font-family: PingFangSC-Light;
  font-size: 0.25rem;
  color: #999999;
  text-align: center;
  line-height: 0.8rem;

}
.footerNav{
  color: #ff6040;
}
</style>