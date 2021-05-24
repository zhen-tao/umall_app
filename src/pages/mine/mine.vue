<template>
  <div>
    <v-header title="个人中心" :back="true"></v-header>
    <div class="user">
      <div class="user_l">
        <img :src='$api + userInfo.avatarurl' alt="" />
        <div class="name">
          <div class="name_t">昵  称: {{userInfo.nickname}}</div>
          <div class="name_b">手机号:  {{userInfo.phone}}</div>
        </div>
      </div>
      <div class="user_r">
        <div class="everyday">每日签到</div>
      </div>
    </div>
    <div class="nav">
      <div class="nav_img">
        <img :src='require("../../assets/images/mine_images/icon_1.jpg")' alt="" />全部订单
      </div>
      <div class="nav_img">
        <img :src='require("../../assets/images/mine_images/icon_2.jpg")' alt="" />待付款
      </div>
      <div class="nav_img">
        <img :src='require("../../assets/images/mine_images/icon_3.jpg")' alt="" />待收货
      </div>
    </div>
    <ul class="list">
      <li @click="$router.push('/ress')">
        <img :src='require("../../assets/images/mine_images/icon_4.jpg")' alt="" />
        <span>地址管理</span>
      </li>
      <li>
        <img :src='require("../../assets/images/mine_images/icon_5.jpg")' alt="" />
        <span>我的钱包</span>
        <span class="sp001">2000余额</span>
      </li>
      <li>
        <img :src='require("../../assets/images/mine_images/icon_6.jpg")' alt="" />
        <span>我的优惠券</span>
      </li>
      <li>
        <img :src='require("../../assets/images/mine_images/icon_7.jpg")' alt="" />
        <span>我的二维码</span>
      </li>
      <li>
        <img :src='require("../../assets/images/mine_images/icon_8.jpg")' alt="" />
        <span>我的小伙伴</span>
      </li>
    </ul>
  </div>
</template>

<script>
import '../../request'
export default {
  data() {
    return {
      userInfo:{}
    }
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    
  },
  methods: {
    
  },
};
</script>

<style scoped>
 .user {
    width: 7.5rem;
    height: 2rem;
    background-color: #ff6445;
    display: flex;
    justify-content: space-between
}

 .user .user_l {
    width: 50%;
    height: 2rem;
    display: flex;
    justify-content: space-between
}

 .user .user_l img {
    width: 1.4rem;
    height: 1.4rem;
    box-sizing: border-box;
    border: .04rem solid #fff;
    border-radius: 50%;
    align-self: center;
    margin-left: .2rem
}

 .user .user_l .name {
    width: 1.7rem;
    height: 2rem
}

 .user .user_l .name .name_t {
    width: 1.7rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .3rem;
    color: #fff;
    overflow: hidden;
    margin-top: .5rem
}

 .user .user_l .name .name_b {
    width: 3.7rem;
    height: .5rem;
    line-height: .5rem;
    font-size: .25rem;
    overflow: hidden;
    font-style: italic
}

 .user .user_r {
    width: 50%;
    height: 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center
}

 .user .user_r .everyday {
    width: 1.6rem;
    height: .7rem;
    color: #f26b11;
    background-color: #fff;
    margin-right: .15rem;
    line-height: .7rem;
    text-align: center;
    font-size: .2rem;
    border-radius: .05rem
}

 .nav {
    width: 7.5rem;
    height: 1.4rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 .2rem;
    border-bottom: .2rem solid #ddd;
}

 .nav_img {
    width: 1.5rem;
    height: 1.4rem;
    text-align: center;
    font-size: .2rem;
    color: #666
}

 .nav_img img {
    width: .35rem;
    height: .3rem;
    margin: 0 auto;
    margin-top: .3rem;
    margin-bottom: .15rem
}

 .list {
    list-style-type: none;
    width: 7.5rem;
    margin-top: .2rem;
    margin-bottom: 1rem;
    background-color: #fff;
    padding-bottom: 1.3rem
}

 .list li {
    width: 7.5rem;
    height: 1.1rem;
    display: flex;
    box-sizing: border-box;
    padding-left: .35rem;
    border-bottom: 1px solid #ddd;
    justify-content: flex-start;
    position: relative
}

 .list li img {
    width: .4rem;
    height: .4rem;
    margin-right: .2rem;
    align-self: center
}

 .list li span {
    width: 3rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: .22rem;
    color: #666;
    overflow: hidden
}

 .list li:nth-child(2) .sp001 {
    width: 2rem;
    height: 1.1rem;
    line-height: 1.1rem;
    font-size: .2rem;
    color: #f26b11;
    text-align: right;
    position: absolute;
    top: 0;
    right: .4rem
}

 .list li:nth-child(3) img {
    height: .3rem
}


</style>