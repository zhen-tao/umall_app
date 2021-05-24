<template>
  <div class="wrap">
    <v-header title="商城" :back="true" class="abc"></v-header>
    <div class="header">
      <div class="headerNav">
        <span>定位</span>
        <img :src="require('../../assets/images/pic/logo/white.png')" alt="" />
        <div class="searchInp">
          <span @click="toSearch">搜索</span
          ><input
            type="text"
            v-model="searchInput"
            v-on:keyup.enter="toSearchPage(searchInput)"
          />
        </div>
        <!-- <div><v-search class="searchInp"></v-search></div> -->
      </div>
      <div class="sort">
        <div class="sort_s">
          <ul class="clearfix">
            <li
              v-for="(item, index) in navArr"
              :key="item.id"
              @click="toList(item.id, index)"
            >{{item.catename}}</li>
          </ul>
        </div>

        <span>分类</span>
      </div>
    </div>
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in images" :key="item.id">
          <img :src="$api + item.img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="hot">
      <div>
        <img
          :src="require('../../assets/images/icon/index/kingkong/brand.png')"
          alt=""
        />
        <span>限时秒杀</span>
      </div>
      <div>
        <img
          :src="require('../../assets/images/icon/index/kingkong/brand.png')"
          alt=""
        />
        <span>限时秒杀</span>
      </div>
      <div>
        <img
          :src="require('../../assets/images/icon/index/kingkong/brand.png')"
          alt=""
        />
        <span>限时秒杀</span>
      </div>
      <div>
        <img
          :src="require('../../assets/images/icon/index/kingkong/brand.png')"
          alt=""
        />
        <span>限时秒杀</span>
      </div>
      <div>
        <img
          :src="require('../../assets/images/icon/index/kingkong/brand.png')"
          alt=""
        />
        <span>限时秒杀</span>
      </div>
    </div>
    <div class="hot_img">
      <div class="hot_img_l">
        <div class="time_l">
          <!-- {{seckill.endtime - seckill.begintime}} -->
          <h3><img src="" alt="" />限 时 秒 杀</h3>
          <h4>每天零点场 好货秒不停</h4>
          <div class="time_s">
            <van-count-down :time="time">
              <template #default="timeData">
                <span class="block">{{ timeData.hours }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.minutes }}</span>
                <span class="colon">:</span>
                <span class="block">{{ timeData.seconds }}</span>
              </template>
            </van-count-down><span class="tim_02"
              >秒杀
              <span class="tim_03"></span>
            </span>
          </div>
          <div class="im_price">
            <img :src="$api + seckill.img" alt="" />
            <div class="price">
              &yen;<span>{{ seckill.price }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="hot_img_r">
        <img
          :src="
            require('../../assets/images/pic/plate/index/kingkong/small.png')
          "
          alt=""
        />
        <img
          :src="require('../../assets/images/pic/plate/index/kingkong/02.png')"
          alt=""
        />
      </div>
    </div>
    <div class="double">
      <span>双十一预购</span>
      <span>畅购全球</span>
    </div>
    <div class="dou_img">
      <img :src="require('../../assets/images/pic/commodity/01.png')" alt="" />
      <img :src="require('../../assets/images/pic/commodity/01.png')" alt="" />
    </div>
    <van-tabs v-model="activeName" @click="homeGoodes(activeName)">
      <van-tab title="热门推荐" name="a">
        <v-list :listArr="listArr"></v-list>
      </van-tab>
      <van-tab title="上心推荐" name="b">
        <v-list :listArr="listArr"></v-list>
      </van-tab>
      <van-tab title="所有商品" name="c">
        <v-list :listArr="listArr"></v-list>
      </van-tab>
    </van-tabs>
    {{ activeName }}
  </div>
</template>

<script>
import { homeBanner, homeGoods, reqCate, seckillTime } from "../../request";
export default {
  data() {
    return {
      navArr: [],
      searchInput: "",
      activeName: "a",
      listArr: [],
      images: [],
      seckill: [],
      time:''
    };
  },
  mounted() {
    reqCate().then((res) => {
      this.navArr = res.data.list;
      console.log(this.navArr);
    });
    // console.log(this.$route);
    homeGoods().then((res) => {
      this.listArr = res.data.list[0].content ? res.data.list[0].content : [];
    });
    homeBanner().then((res) => {
      this.images = res.data.list;
    });
    seckillTime().then((res) => {
      this.seckill = res.data.list?res.data.list[1]?res.data.list[1]:{}:{};
      if(this.seckill={}){
        this.time = 0
        return
      }
      this.time= this.seckill.endtime - new Date().getTime()
    });
  },
  methods: {
    toList(id, index) {
      // console.log(this.navArr[index].catename);
      this.$router.push(
        "/list?id=" + id + "&catename=" + this.navArr[index].catename
      );
    },
    toSearch() {
      this.$router.push("/search");
    },
    toSearchPage(searchInput) {
      this.$router.push("/search?search=" + searchInput);
    },
    homeGoodes(name) {
      if (name == "a") {
        homeGoods().then((res) => {
          this.listArr = res.data.list[0].content
            ? res.data.list[0].content
            : [];
          // console.log(res.data.list[0].content);
        });
        return;
      }
      if (name == "b") {
        homeGoods().then((res) => {
          this.listArr = res.data.list[1].content
            ? res.data.list[1].content
            : [];
        });
        return;
      }
      if (name == "c") {
        homeGoods().then((res) => {
          this.listArr = res.data.list[2].content
            ? res.data.list[2].content
            : [];
        });
        return;
      }
      // homeGoods().then((res) => {});
    },
  },
};
</script>

<style scoped>
.colon {
    display: inline-block;
    margin: 0 4px;
    color: #ee0a24;
  }
  .block {
    display: inline-block;
    width: 22px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background-color: #ee0a24;
  }
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.wrap {
  width: 100%;
  background-color: #fff;
}
.header {
  width: 100%;
  height: 1.2rem;
  background-image: linear-gradient(180deg, #ff6040 0%, #ff8a80 100%);
  box-shadow: 0 0.02rem 0.06rem 0 rgba(255, 149, 128, 0.5);
}
.headerNav {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.25rem;
  color: #fff;
}
.headerNav img {
  width: 1.5rem;
  height: 0.4rem;
  margin-top: 0.1rem;
  /* background-color: #fff; */
}
.searchInp {
  width: auto;
}
.headerNav input {
  /* width: 1.5rem;
    height: 0.4rem; */
  /* margin-top: .1rem; */
  color: #666;
  outline: none;
  background-color: #fff;
  border: none;
  margin-left: 0.2rem;
  height: 0.4rem;
  /* background-color: #fff; */
}
.sort {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  display: flex;
  font-size: 0.25rem;
  color: #fff3f2;
}
.sort_s {
  flex: 1;
  /* width: 100%; */
  height: 0.7rem;
  overflow: scroll;
  padding: 0 0.1rem;
}
.sort_s::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.sort ul {
  /* width: 100%; */
  /* width: auto; */
  /* min-width: 100%; */
  /* width: auto;
  height: 0.7rem; */
  display: flex;
  white-space: nowrap;
  /* overflow: hidden; */
}
.sort ul li {
  margin: 0 0.2rem;
  /* display: inline; */
  /* width: 1rem; */
  float: left;
  /* margin: 0 0.1rem; */

  /* overflow:scroll; */
}
.sort span {
  display: block;
  width: 0.7rem;
  text-align: center;
  margin: 0 0.1rem;
  background-image: linear-gradient(180deg, #ff7a68 0%, #ff8a80 100%);
  box-shadow: -5px 0px 10px -5px #e63d2e;
}
.banner {
  width: 100%;
  height: 3rem;
  box-sizing: border-box;
  padding: 0.1rem;
}
.banner img {
  width: 100%;
  height: 3rem;
}
.hot {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0.3rem;
}
.hot div {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.hot div img {
  width: 0.7rem;
}
.hot_img {
  width: 100%;
  height: 3.2rem;
  display: flex;
  box-sizing: border-box;
  padding: 0.1rem;
}
.hot_img_l {
  flex: 1;
}
.hot_img_l .time_l {
  width: 95%;
  height: 3rem;
}

.time_l {
  width: 3.74rem;
  height: 3.8rem;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
  padding-left: 0.2rem;
}

.time_l h3 {
  width: 3.4rem;
  height: 0.3rem;
  font-size: 0.26rem;
  display: flex;
  color: #e92460;
  font-weight: 600;
  margin-top: 0.2rem;
}

.time_l h3 img {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  margin-right: 0.1rem;
}

.time_l h4 {
  width: 3.4rem;
  height: 0.3rem;
  font-size: 0.22rem;
  color: #999;
  margin-top: 0.05rem;
}

.time_l .time_s {
  width: 3.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin-top: 0.15rem;
  font-size: 0.2rem;
  white-space: nowrap;
  z-index: 10;
  position: absolute;
  left: 0.05rem;
  bottom: 1.9rem;
}

.time_l .time_s .tim_01 {
  font-size: 0.16rem;
  
  color: #fff;
  padding: 0.12rem 0.1rem;
  background-color: black;
  border-radius: 0.1rem;
  margin: 0 0.03rem;
  /* z-index: 10; */
  /* z-index: 10; */
}

.time_l .time_s .tim_02 {
  /* float: left; */
  height: .3rem;
  font-size: 0.22rem;
  font-weight: bold;
  padding-top: 0.09rem;
  padding-bottom: 0.09rem;
  padding-left: 0.3rem;
  padding-right: 0.1rem;
  margin-left: 0.5rem;
  background-color: #fee301;
  /* position: relative; */
  position: absolute;
  left: 1.8rem;
  top: 0;
  border-radius: 0.05rem;
}

.time_l .time_s .tim_02 .tim_03 {
  width: 0;
  height: 0;
  border-width: 0.22rem;
  border-style: solid;
  border-color: transparent transparent transparent #fee301;
  position: absolute;
  top: -0.01rem;
  right: -0.44rem;
  z-index: 10;
}

.time_l .im_price {
  width: 2.7rem;
  height: 2.1rem;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0.1rem;
  z-index: 0;
  /* background-image: url(../images/index_images/shop_5.jpg); */
  /* background-size: 2.7rem 2.1rem;
    background-repeat: no-repeat;
    background-position: 0 0, */
}
.time_l .im_price img {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  top: 0; */
  z-index: 0;
  /* z-index: -1;
   */
}

.time_l .im_price .price {
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 50%;
  background-color: #ff3179;
  text-align: center;
  line-height: 0.85rem;
  white-space: nowrap;
  color: #fff;
  font-size: 0.18rem;
  position: absolute;
  right: -0.35rem;
  bottom: 0.05rem;
}

.time_l .im_price .price span {
  font-size: 0.28rem;
}

.hot_img_r {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.hot_img_r img {
  width: 95%;
  height: 1.45rem;
}
.double {
  width: 100%;
  height: 0.5rem;
  line-height: 0.5rem;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.3rem;
  color: #aaa;
  text-align: center;
  align-items: center;
}
.dou_img {
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: space-evenly;
}

/* .abc{
  background: blue;
} */
</style>