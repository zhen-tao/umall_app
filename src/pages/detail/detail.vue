<template>
  <div class="wrap">
    <v-header :title="detail.goodsname" :back="true"></v-header>
    <div class="content">
      <div v-html="detail.description" class="description"></div>
      <div class="banner">
        <img :src="$api + detail.img" alt="" />
      </div>
      <div class="price">
        <div class="price_l">
          <span>售价:￥{{ detail.price }}</span>
          <del>原价:￥{{ detail.market_price }}</del>
        </div>
      </div>
      <div class="specs">
        <div class="specs_l">{{ detail.specsname }}：</div>
        <div class="specs_r">
          <span v-for="item in detail.specsattr" :key="item">{{ item }}</span>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" >
      <div class="cate">
        <span>{{ detail.specsname }}：</span><span v-for="(item,index) in detail.specsattr" :key="item" :class="n == index?activeSpan:''" @click="n = index">{{ item }}</span>
      </div>
      <van-button type="danger" round block @click="add(detail.id)">加入购物车</van-button>
    </van-popup>
    <div class="footer">
      <div class="foo_img" @click="$router.push('/index/shop?detailid='+detail.id)">
        <div class="space">
          <span>2</span>
        </div>
        购物车
      </div>
      <div class="car01" @click="show = true">加入购物车</div>
      <div class="car02" @click="toOrder(detail.id)">立即购买</div>
    </div>
  </div>
</template>

<script>
/**
 * if (this.$route.query.detailid) {
      getOneShop(this.$route.query.detailid).then((res) => {
        localStorage.setItem("arr", JSON.stringify(res.data.list));
      });
    }
 */
import { addShop, getOneShop } from "../../request";
export default {
  data() {
    return {
      show:false,
      detail: {},
      activeSpan:"activeSpan",
      n:0
    };
  },
  mounted() {
    getOneShop(this.$route.query.id).then((res) => {
      this.detail = res.data.list[0];
      // console.log(this.detail,'222');
      this.detail.specsattr = this.detail.specsattr.split(",");
    });
  },
  methods: {
      add(id){
          addShop(id).then(res=>{
            this.$toast(res.data.msg)
            this.show = false
          })
      },
      toOrder(id){
        getOneShop(id).then(res=>{
          let arr = res.data.list;
          arr.forEach(item => {
            item.num = 1
            
          });
          localStorage.setItem('arr',JSON.stringify(arr))
          this.$router.push("/order")
        })
      }
  },
};
</script>

<style scoped>
.cate{
  width: 100%;
  height: 1rem;
  overflow: hidden;
}
.cate span{
  margin: .2rem;
  padding: .1rem .15rem;
  float: left;
}
.activeSpan{
  background-color: #ff4400;
  color: #fff;
}
.van-button{
  position: absolute;
  bottom: .1rem;
  left: 0;
}
.wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 .1rem;
}
.content {
  width: 100%;
}
.description {
  width: 100%;
  margin: 0.2rem 0;
  font-size: 0.2rem;
  border: 0.01rem solid transparent;
}
.banner {
  width: 100%;
  margin: 0.3rem 0;
}
.banner img {
  width: 100%;
}
.price {
  width: 100%;
  height: 0.3rem;
  display: flex;
  margin: 0.2rem 0;
}
.price_l {
  flex: 1;
  height: 0.3rem;
  line-height: 0.3rem;
  display: flex;
  font-size: 0.3rem;
  box-sizing: border-box;
  padding: 0 0.3rem;
}
.price_l span {
  color: #ff4400;
  margin-right: 0.2rem;
}
.price_l del {
  color: #888;
  font-size: 0.2rem;
}
.specs {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.2rem;
  margin: 0.2rem 0;
  height: 0.4rem;
  font-size: 0.3rem;
  line-height: 0.4rem;
  display: flex;
}
.specs_l {
  width: 1rem;
  text-align: center;
}
.specs_r {
  flex: 1;
  display: flex;
  align-items: center;
}
.specs_r span {
  display: inline-block;
  margin: 0.1rem 0.2rem;
}
.footer {
  width: 7.5rem;
  height: 1.15rem;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  display: flex;
  white-space: normal;
  justify-content: space-between;
}

.footer .foo_img {
  width: 1.7rem;
  height: 1.15rem;
  font-size: 0.18rem;
  color: #666;
  text-align: center;
  cursor: pointer;
}

.footer .foo_img .space {
  width: 0.4rem;
  height: 0.35rem;
  background-color: #aaa;
  background-size: 0.4rem 0.35rem;
  background-repeat: no-repeat;
  background-position: 0 0;
  margin: 0 auto;
  margin-top: 0.25rem;
  margin-bottom: 0.1rem;
  position: relative;
}

.footer .foo_img .space span {
  position: absolute;
  right: -0.1rem;
  top: -0.1rem;
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 50%;
  background-color: #e5393c;
  color: #fff;
  text-align: center;
  line-height: 0.2rem;
  font-size: 0.18rem;
}

.footer .foo_img:hover .space {
  background-color: #ff4400;
}

.footer .foo_img:hover {
  color: #f26b11;
}

.footer .car01 {
  width: 2.9rem;
  height: 1.15rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 1.15rem;
  box-sizing: border-box;
  color: #fff;
  background-color: #f26b11;
  cursor: pointer;
}

.footer .car02 {
  width: 2.9rem;
  height: 1.15rem;
  font-size: 0.24rem;
  text-align: center;
  line-height: 1.15rem;
  box-sizing: border-box;
  border-left: 1px solid #fff;
  color: #fff;
  background-color: #e33a43;
  cursor: pointer;
}
</style>