<template>
  <div class="catewrap">
    <v-header title="分类" :back="true"></v-header>
    <div class="catecon">
      <div class="catecon_l">
        <ul>
          <li>周末特惠</li>
          <li v-for="item in catesList" :key="item.id">{{item.catename}}</li>
        </ul>
      </div>
      <div class="catecon_r">
        <h3>热门精选</h3>
        <div class="children" v-for="item in catesList" :key="item.id" :v-if="item.children">
          <div class="box_r" v-for="item1 in item.children" :key="item1.id" @click="toDetail(item1.id)">
            <img :src="$api + item1.img" alt="">
            <div class="cate_r_name">{{item1.catename}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCate } from "../../request";
export default {
  data() {
    return {
      catesList: [],
    };
  },
  mounted() {
    getCate().then((res) => {
      this.catesList = res.data.list;
    });
  },
  methods: {
    toDetail(id){
      this.$router.push('/detail?id='+id)
    }    
  },
};
</script>

<style scoped>
.catewrap {
  width: 100%;
  /* height: 100%; */
  height: 11.5rem;
  box-sizing: border-box;
  /* padding-top: .8rem; */
  background-color: #fff;
  overflow: hidden;
}
.catecon {
  width: 100%;
  /* height: (100vh - 1.6rem); */
  /* height: 100%; */
  height: 11.5rem;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  /* padding: 0rem 0.2rem; */
  overflow:hidden;
  /* position: absolute;
  top: 0.8rem;
  bottom: 0.8rem; */
}
.catecon_l {
  width: 2.2rem;
  height: 100%;
  background: #ffffff;
  /* box-shadow: 0 0.02rem 0.2rem 0 rgba(51, 51, 51, 0.1); */
  }
.catecon_l ul {
  width: 100%;
  height: 100%;
}
.catecon_l ul li {
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  text-align: center;
  margin: 0.1rem 0;
  font-family: PingFangSC-Light;
  color: #999999;
}
.catecon_r {
  width: 4.5rem;
  background-color: #fff;
  box-sizing: border-box;
  padding: 0 .1rem;
  height: 100%;
  overflow-y:scroll;
}
.catecon_r h3{
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  font-size: 0.3rem;
  font-weight: 600;
}
.children{
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: .2rem 0;
   box-shadow: 0 5px 10px 0 rgba(51,51,51,0.10);
}
.children .box_r{
  width: 1.4rem;
  height: 2.3rem;
}
.box_r img{
  width: 1.4rem;
  height: 1.9rem;
}
.cate_r_name{
  width: 100%;
  height: 0.4rem;
  line-height: .4rem;
  text-align: center;
  font-size: .25rem;
}
</style>