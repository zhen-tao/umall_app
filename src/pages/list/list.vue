<template>
  <div class="wrap">
    <div class="sort">
      <ul>
        <li>综合推荐</li>
        <li>销量</li>
        <li>价格</li>
        <li>好评度</li>
        <li>店铺</li>
      </ul>
      <span>分类</span>
    </div>
    <v-header :title="$route.query.catename" :back="true"></v-header>
    <div>  
      <!-- <div class="sort">
        <ul>
          <li>综合推荐</li>
          <li>销量</li>
          <li>价格</li>
          <li>好评度</li>
          <li>店铺</li>
        </ul>
        <span>分类</span>
      </div>
      <div v-if="listArr.length==0">暂无数据</div>
      <div v-else class="shoplist">
        <ul>
          <li class="lis" @click="todetail(item.id)" v-for="item in listArr" :key="item.id">
            <div class="img"><img :src="$api + item.img" alt="" /></div>
            <div class="text">
              <h3>{{ item.goodsname }}</h3>
              <div class="price">
                <div class="price_l">
                  <span style="margin-right: 0.2rem; color: #ff6040"
                    >售价:￥{{ item.price }}</span
                  ><del style="color: #aaa">原价：{{ item.market_price }}</del>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div> -->
      <v-list :listArr="listArr"></v-list>
    </div>
  </div>
</template>

<script>
import { reqCatelist } from "../../request";
export default {
  data() {
    return {
      listArr: [],
    };
  },
  mounted() {
    reqCatelist(this.$route.query.id).then((res) => {
      this.listArr = res.data.list.goodData?res.data.list.goodData:[]
    });
  },
  // methods: {
  //   todetail(id){
  //     this.$router.push('detail?id='+id)
  //   }
  // },
};
</script>

<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
}
.wrap .sort{
  display: flex;
  background-color: #ff6445;
  color: #fff;
  font-size: .3rem;
  padding: .2rem .2rem;
}
.wrap .sort ul {
  /* width: 100%; */
  /* width: auto; */
  /* min-width: 100%; */
  flex: 1;
  display: flex;
  padding-right: 0.1rem;
  white-space: nowrap;
  /* overflow: hidden; */
}
.wrap .sort ul li {
  flex: 1;
  text-align: center;
  /* margin: 0 0.2rem; */
  /* display: inline; */
  /* width: 1rem; */
  /* float: left; */
  /* margin: 0 0.1rem; */

  /* overflow:scroll; */
}
.wrap .sort span {
  align-items: center;
  display: block;
  width: 0.7rem;
  text-align: center;
  margin: 0 0.1rem;
  padding: .1rem .15rem;
  background-image: linear-gradient(180deg, #ff7a68 0%, #ff8a80 100%);
  box-shadow: -5px 0px 10px -5px #e63d2e;
}
</style>