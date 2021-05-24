<template>
  <div class="wrap">
    <v-header title="我的地址" :back="true"></v-header>
    <div v-if="ressList.length == 0">暂无数据，快去添加吧</div>
    <van-swipe-cell v-for="item in ressList" :key="item.id" class="box">
      <div class="ress"  @click="toOrder(item.id)">
        <div class="ress_l"><input type="radio" name="radioress" id="" /></div>
        <div class="ress_r">
          <div class="ress_rt">
            <span>姓名：{{ item.username }}</span>
            <span>电话：{{ item.userphone }}</span>
          </div>
          <div class="ress_rb">
            <span>{{ item.location }}</span
            ><span>{{ item.useraddress }}</span>
          </div>
        </div>
        <div class="ress_rr">
          <van-icon name="edit" size=".5rem" @click="toedit(item.id)" />
        </div>
      </div>

      <template #right>
        <van-button
          square
          text="删除"
          type="danger"
          class="delete-button"
          @click="delress(item.id)"
        />
      </template>
    </van-swipe-cell>

    <div class="ress_btn">
      <van-button round type="danger" size="large" @click="onAdd()"
        >新增地址</van-button
      >
    </div>
    <!-- {{chosenAddressId}} -->
  </div>
</template>

<script>
import { delRess, ressList } from "../../request";

export default {
  data() {
    return {
      ressList: [],
      // val:""
    };
  },
  methods: {
    onAdd() {
      this.$router.push("/address");
    },
    toedit(id) {
      this.$router.push("/address?ressedit=" + id);
    },
    delress(id) {
      delRess(id).then((res) => {
        ressList().then((res) => {
          this.ressList = res.data.list ? res.data.list : [];
        });
      });
    },
    toOrder(id){
      if(this.$route.query.order){
        this.$router.replace('/order?id='+id)
      }
      return
    }
  },
  mounted() {
    ressList().then((res) => {
      this.ressList = res.data.list ? res.data.list : [];
    });
    
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  margin: 0.1rem 0;
  z-index: 0;
  border-bottom: 1px solid #555;
}
.wrap {
  width: 100%;
  height: 100%;
  /* height: 100vh; */
  box-sizing: border-box;
  overflow: hidden;
  /* background-color: #f4f4f4; */
}
.ress {
  width: 100%;
  height: 0.8rem;
  display: flex;
  font-size: 0.25rem;
  margin: 0.2rem;
}
.ress_l {
  width: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ress_r {
  flex: 1;
}
.ress_rr {
  width: 1.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ress_rt {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
}
.ress_rt span {
  margin: 0 0.3rem;
}
.ress_rb {
  width: 100%;
  height: 0.4rem;
  line-height: 0.4rem;
}
.ress_rb span {
  margin: 0 0.2rem;
}
.ress_btn {
  /* margin-top: 2rem; */
  width: 100%;
  height: 1.2rem;
  line-height: 0.9rem;
  font-size: 0.3rem;
  position: fixed;
  bottom: 0;
  left: 0;
}
</style>