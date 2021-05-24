<template>
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
    </div> -->
    <div v-if="listArr.length == 0">暂无数据</div>
    <div v-else class="shoplist">
      <ul>
        <li
          class="lis"
          @click="todetail(item.id)"
          v-for="item in listArr"
          :key="item.id"
        >
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
    </div>
  </div>
</template>

<script>
// import { likeSearch } from '../request';
export default {
  props:["listArr"],
  // data() {
  //   return {
  //     listArr: [],
  //   };
  // },
  methods: {
    todetail(id) {
      this.$router.push("/detail?id=" + id);
    },
  },
};
</script>

<style scoped>

.lis {
  width: 100%;
  display: flex;
  margin: 0.2rem 0;
  box-sizing: border-box;
  padding: 0 0.3rem;
}

.img {
  width: 2.5rem;
}

.img img {
  width: 2.5rem;
  height: 2.5rem;
}

.text {
  flex: 1;
  box-sizing: border-box;
  padding: 0 0.1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.text h3 {
  width: 100%;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  color: #333333;
  box-sizing: border-box;
  padding-left: 0.3rem;
}

.ele {
  /* width: 100%; */
  width: 1.5rem;
  height: 0.3rem;
  font-family: PingFangSC-Regular;
  font-size: 0.1rem;
  background-color: #ccc;
  color: #333333;
  line-height: 0.3rem;
}

.new {
  font-family: PingFangSC-Light;
  font-size: 0.15rem;
  color: #ff6040;
  line-height: 0.15rem;
}

.price {
  width: 100%;
  display: flex;
  font-size: 0.3rem;
  justify-content: space-evenly;
}
</style>