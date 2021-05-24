<template>
  <div class="wrap">
    <v-header
      title="购物车"
      :back="true"
      v-if="$route.query.detailid"
    ></v-header>
    <v-header title="购物车" v-else></v-header>
    <div v-if="shop_listArr.length == 0">暂无数据，快去添加吧</div>
    <div v-else>
      <van-swipe-cell
        v-for="(item, index) in shop_listArr"
        :key="item.id"
        class="box"
      >
        <div class="lis">
          <div class="input">
            <input
              type="checkbox"
              name=""
              class="checkone"
              v-model="item.checked"
              @change="checkone"
            />
          </div>
          <div class="img"><img :src="$api + item.img" alt="" /></div>
          <div class="text">
            <h3>{{ item.goodsname }}</h3>
            <!-- <h4>{{ item.txt }}</h4> -->
            <!-- <div class="ele">{{ item.svg }}</div> -->
            <!-- <div class="new">{{ item.add }}</div> -->
            <div class="price">
              <div class="price_l">
                <span style="margin-right: 0.2rem; color: #ff6040"
                  >￥{{ item.price }}</span
                >
                <!-- <del style="color: #aaa">￥1111</del> -->
              </div>
              <div class="price_r">
                <span class="add" @click="edit(item.id, 2, index)">+</span>
                <span>{{ item.num }}</span>
                <span class="sub" @click="edit(item.id, 1, index)">-</span>
              </div>
            </div>
          </div>
        </div>

        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="delshop(item.id)"
          />
        </template>
      </van-swipe-cell>
      <div class="foot">
        <div class="foot_l">
          <input
            type="checkbox"
            name=""
            id="footchecked"
            v-model="checkAll"
            @change="allcheck"
          />
          <label for="footchecked">全选</label>
        </div>
        <div class="sum">
          <span style="font-size: 0.25rem; font-weight: 600">合计</span>
          <span>已免运费</span>
        </div>
        <div class="f_price">￥{{ allprice }}</div>
        <div class="end" @click="toOrder">结算</div>
      </div>
    </div>
  </div>
</template>

<script>
import { editShop, shopDel, shopLiat } from "../../request";

export default {
  data() {
    return {
      shop_listArr: [],
      checkAll: false,
      // inps:[]
      lastTime: true,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      shopLiat().then((res) => {
        this.lastTime = true;
        let arr = res.data.list ? res.data.list : [];
        //[{id:1,checked:true}]
        let checkedArr = this.shop_listArr.map((item) => ({
          id: item.id,
          checked: item.checked,
        }));

        arr.forEach((item) => {
          item.checked = checkedArr.find((i) => i.id == item.id)
            ? checkedArr.find((i) => i.id == item.id).checked
            : false;
        });
        console.log("=====================");
        console.log(arr);
        this.shop_listArr = arr;

        // console.log("22222");
        // console.log(this.shop_listArr, "3333333");
      });
    },
    allcheck() {
      this.shop_listArr.map((item) => {
        item.checked = this.checkAll;
      });
    },
    checkone() {
      this.checkAll = this.shop_listArr.every((item) => item.checked);
    },
    edit(id, type, index) {
      // let now = new Date().getTime();
      if (this.lastTime) {
        // this.lastTime = now + 500;
        this.lastTime = false;
        if (type == 1) {
          if (this.shop_listArr[index].num < 2) {
            this.lastTime = true;
            return;
          }
        }
        editShop(id, type).then((res) => {
          this.init();
        });
      }
    },
    delshop(id) {
      shopDel(id).then((res) => {
        this.init();
      });
    },
    toOrder() {
      // console.log(this.shop_listArr);
      // console.log(this.shop_listArr.filter((item) => item.checked));
      let arr = this.shop_listArr.filter((item) => item.checked);
      if (arr.length == 0) {
        this.$toast("请选择要结算的商品");
        return;
      }
      if (arr.length != 0) {
        localStorage.setItem("arr", JSON.stringify(arr));
        this.$router.push("/order");
      }
    },
  },
  computed: {
    allprice() {
      let sum = 0;
      // let inps = [...document.getElementsByClassName('checkone')]
      // inps.map((item,i) => {
      //   //只有被选中的才做合计金额
      //   if(item.checked){
      //     sum += shop_listArr[i].price * shop_listArr[i].num;
      //   }
      //   // if (this.inps[i].checked) {
      //   //   sum += item.price * item.num;
      //   //   console.log(this.inp[i]);
      //   // }
      // });
      this.shop_listArr.forEach((item) => {
        item.checked && (sum += item.price * item.num);
      });
      return sum.toFixed(2);
    },
  },
};
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 100%;
}
.wrap {
  width: 100%;
  height: 100%;
  /* z-index: 0; */
}
.box {
  width: 100%;
  margin: 0.1rem 0;
  z-index: 0;
}
.lis {
  width: 100%;
  display: flex;

  box-sizing: border-box;
  padding: 0 0.2rem;
}

.input {
  width: 0.4rem;
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
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: #333333;
}

.price {
  width: 100%;
  display: flex;
  font-size: 0.25rem;
  justify-content: space-between;
}

.price_l {
  display: flex;
}
.price_r {
  display: flex;
  direction: rtl;
  font-size: 0.4rem;
}

.price_r span {
  margin: 0 0.1rem;
}
.foot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.3rem;
  position: fixed;
  bottom: 0.8rem;
  left: 0;
  background-color: #fff;
}

.foot div {
  flex: 1;
  text-align: center;
}

.end {
  background-color: #ff6040;
  color: #fff;
}

.f_price {
  color: #ff6040;
}

.sum {
  display: flex;
  flex-direction: column;
  font-size: 0.2rem;
  justify-content: space-evenly;
}

.sum span {
  padding: 0;
  margin: 0;
  height: 0.2rem;
  line-height: 0.1rem;
}
</style>