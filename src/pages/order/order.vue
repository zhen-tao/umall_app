<template>
  <div>
    <v-header title="确认订单" :back="true"></v-header>
    <div
      class="people"
      @click="$router.replace('/ress?order=1')"
      v-if="ressList[0]"
    >
      <div class="peo_text">
        <div class="text_top">
          <div class="name">收货人：{{ ressList[0].username }}</div>
          <div class="number">手机号：{{ ressList[0].userphone }}</div>
        </div>
        <div class="text_bottom">
          收货地址：{{ ressList[0].location }}&nbsp;&nbsp;{{
            ressList[0].useraddress
          }}
        </div>
      </div>
      <!-- <img src="" alt="" class="peo_img" /> -->
    </div>
    <div class="people" v-else>
      <button @click="$router.replace('/ress?order=1')">点击添加地址</button>
    </div>
    <div class="shopnum" v-for="item in shopList" :key="item.id">
      <div class="shopnum01 sn01">
        <div class="shop_l">
          <img :src="$api + item.img" alt="" />
          <div class="sh_text">
            <div class="sh_t_t">{{ item.goodsname }}</div>
            <div class="sh_t_b">规格：50g</div>
          </div>
        </div>
        <div class="shop_r">
          &yen; <span>{{ item.price }}</span>
        </div>
      </div>
      <div class="shopnum01 sn02">
        <div class="num_l">购买数量 :</div>
        <div class="num_r">
          <div class="plus">
            <!-- <span class="span01">&minus;</span> -->
            <span class="span02">{{ item.num }}</span>
            <!-- <span class="span01">&plus;</span> -->
          </div>
        </div>
      </div>
      <div class="shopnum02 sn03">
        <div class="delivery_l">配送方式</div>
        <div class="delivery_2">XX快递</div>
      </div>
    </div>
    <div class="discount">
      <div class="coupon">
        <div class="coupon_l">优惠券</div>
        <div class="coupon_r">无可用</div>
      </div>
      <div class="points">
        <div class="ponints_l">
          <span>使用积分</span>
          <div class="inp">
            <input type="text" placeholder="输入积分" />
            <div class="btn">使用</div>
          </div>
        </div>
        <div class="ponints_r">可用<span>50</span>积分</div>
      </div>
    </div>
    <div class="total">
      <div class="total_01">
        <div class="total_text">商品金额</div>
        <div class="total_num">&yen;{{ allprice }}</div>
      </div>
      <div class="total_01">
        <div class="total_text">运费</div>
        <div class="total_num">&plus;&yen;0.00</div>
      </div>
      <div class="total_01">
        <div class="total_text">优惠券</div>
        <div class="total_num">&minus;&yen;0.00</div>
      </div>
      <div class="total_01">
        <div class="total_text">会员优惠</div>
        <div class="total_num">&minus;&yen;0.00</div>
      </div>
      <div class="total_01">
        <div class="total_text">积分抵扣</div>
        <div class="total_num">&minus;&yen;0.00</div>
      </div>
    </div>
    <div class="really">
      实际金额 : <span>&yen;{{ allprice }}</span>
    </div>
    <div class="submit_order">
      <div class="submit" @click="submit">提交订单</div>
    </div>
  </div>
</template>

<script>
import { getOneShop, selectRess, submitOrder } from "../../request";
export default {
  data() {
    return {
      ressList: [],
      shopList: [],
    };
  },
  methods: {
    submit(){
      if(!this.ressList[0].id){
        this.$toast("请选择地址")
        return;
      }
      let obj = {
        countmoney:this.allprice,
        countnumber:this.shopList.reduce((val,item)=>val += item.num,0),
        idstr:this.shopList.reduce((val,item)=>val+=","+item.id,"").slice(1)
      }
      submitOrder({
        ...obj,
        addressid:this.ressList[0].id
      }).then(res=>{

      })
    }
  },
  mounted() {
    if (this.$route.query.id) {
      selectRess(this.$route.query.id).then((res) => {
        this.ressList = res.data.list;
        console.log(this.ressList);
      });
    }
    
    this.shopList = JSON.parse(localStorage.getItem("arr"));
  },
  computed: {
    allprice() {
      let num = 0;
      this.shopList.map((item) => (num += item.price * item.num));
      return num.toFixed(2);
    },
  },
};
</script>

<style scoped>
.people {
  width: 7.5rem;
  height: 1.5rem;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
}

.people .peo_text {
  width: 6.5rem;
  height: 1.5rem;
}

.people .peo_text .text_top {
  width: 6.5rem;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.22rem;
  color: #666;
  margin-top: 0.2rem;
}

.people .peo_text .text_bottom {
  width: 6.5rem;
  height: 0.6rem;
  line-height: 0.3rem;
  overflow: hidden;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 0.22rem;
  color: #666;
  box-sizing: border-box;
  padding-left: 1.1rem;
  text-indent: -1.1rem;
}

.people .peo_img {
  width: 0.15rem;
  height: 0.3rem;
  margin-top: 0.6rem;
}

.shopnum {
  width: 7.5rem;
  height: 3.6rem;
  background-color: #fff;
  margin-top: 0.15rem;
}

.shopnum .shopnum01 {
  width: 7.05rem;
  height: 1.35rem;
  margin: 0 auto;
  line-height: 1.35rem;
  display: flex;
  justify-content: space-between;
}

.shopnum .sn01 .shop_l {
  width: 50%;
  height: 1.35rem;
  display: flex;
  overflow: hidden;
  box-sizing: border-box;
}

.shopnum .sn01 .shop_l img {
  width: 1.05rem;
  height: 1rem;
  margin-top: 0.175rem;
}

.shopnum .sn01 .shop_l .sh_text {
  width: 2.1rem;
  height: 1.35rem;
  box-sizing: border-box;
  padding-left: 0.3rem;
}

.shopnum .sn01 .shop_l .sh_text .sh_t_t {
  width: 2.1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.24rem;
  color: #444;
  margin-top: 0.27rem;
}

.shopnum .sn01 .shop_l .sh_text .sh_t_b {
  width: 2.1rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.22rem;
  color: #999;
}

.shopnum .sn01 .shop_r {
  width: 50%;
  height: 1.35rem;
  color: #e33a43;
  font-size: 0.2rem;
  text-align: right;
}

.shopnum .sn01 .shop_r span {
  font-size: 0.25rem;
}

.shopnum .sn02 .num_l {
  width: 50%;
  height: 1.35rem;
  line-height: 1.35rem;
  font-size: 0.24rem;
  color: #666;
}

.shopnum .sn02 .num_r {
  width: 50%;
  height: 1.35rem;
  display: flex;
  justify-content: flex-end;
}

.shopnum .sn02 .num_r .plus {
  width: 2.9rem;
  height: 0.6rem;
  display: flex;
  justify-content: flex-end;
  line-height: 0.6rem;
  font-size: 0.22rem;
  color: #666;
  margin-top: 0.37rem;
}

.shopnum .sn02 .num_r .plus .span01 {
  width: 0.7rem;
  box-sizing: border-box;
  border: 1px solid #666;
  text-align: center;
  font-size: 0.3rem;
  border-radius: 0.05rem;
  cursor: pointer;
}

.shopnum .sn02 .num_r .plus .span02 {
  width: 1.15rem;
  box-sizing: border-box;
  border: 1px solid #666;
  text-align: center;
  border-radius: 0.05rem;
  margin: 0 0.1rem;
  cursor: pointer;
}

.shopnum .sn03 {
  width: 7.5rem;
  height: 0.9rem;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
  display: flex;
  line-height: 0.9rem;
  justify-content: space-between;
  font-size: 0.24rem;
  color: #666;
  overflow: hidden;
  padding: 0 0.2rem;
}

.discount {
  width: 7.5rem;
  height: 2.1rem;
  background-color: #fff;
  margin-top: 0.2rem;
}

.discount .coupon {
  width: 7.5rem;
  height: 1.05rem;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  display: flex;
  line-height: 1.05rem;
  justify-content: space-between;
  font-size: 0.24rem;
  color: #666;
  overflow: hidden;
  padding: 0 0.2rem;
}

.discount .points {
  width: 7.5rem;
  height: 1.05rem;
  font-size: 0.22rem;
  color: #666;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  line-height: 1.05rem;
}

.discount .points .ponints_l {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.discount .points .ponints_l span {
  padding-left: 0.2rem;
}

.discount .points .ponints_l .inp {
  width: 3rem;
  height: 0.7rem;
  margin-top: 0.17rem;
  display: flex;
  justify-content: flex-end;
}

.discount .points .ponints_l .inp input {
  width: 1.5rem;
  height: 0.7rem;
  box-sizing: border-box;
  border: 1px solid #ddd;
  font-size: 0.22rem;
  color: #999;
  text-align: center;
  line-height: 0.7rem;
}

.discount .points .ponints_l .inp .btn {
  width: 0.7rem;
  height: 0.7rem;
  background-color: #f26b11;
  color: #fff;
  line-height: 0.7rem;
  font-size: 0.22rem;
  text-align: center;
  margin-left: 0.2rem;
  border-radius: 0.05rem;
  cursor: pointer;
}

.discount .points .ponints_r {
  width: 1.7rem;
  text-align: right;
  box-sizing: border-box;
  overflow: hidden;
  padding-right: 0.2rem;
}

.discount .points .ponints_r span {
  color: #e33a43;
}

.total {
  width: 7.5rem;
  background-color: #fff;
  margin-top: 0.2rem;
  padding-top: 0.2rem;
  padding-bottom: 0.1rem;
  border-bottom: 1px solid #ddd;
}

.total .total_01 {
  width: 7.05rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin: 0 auto;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  font-size: 0.2rem;
  color: #666;
}

.total .total_01 .total_text {
  overflow: hidden;
}

.total .total_01 .total_num {
  color: #e33a43;
  overflow: hidden;
}

.really {
  width: 7.5rem;
  height: 1.3rem;
  overflow: hidden;
  line-height: 1.3rem;
  background-color: #fff;
  font-size: 0.26rem;
  color: #444;
  box-sizing: border-box;
  padding-right: 0.2rem;
  text-align: right;
}

.really span {
  color: #e33a43;
  margin: 0 0.1rem;
}

.submit_order {
  width: 7.5rem;
  height: 1.1rem;
  background-color: #fff;
  margin-bottom: 1.5rem;
}

.submit_order .submit {
  width: 3.5rem;
  height: 1.1rem;
  margin: 0 auto;
  line-height: 1.1rem;
  text-align: center;
  color: #fff;
  background-color: #f26b11;
  font-size: 0.24rem;
  border-radius: 0.05rem;
}
</style>