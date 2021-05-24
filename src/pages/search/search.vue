<template>
  <div class="searchWrap">
    <v-header title="搜索" :back="true"></v-header>
    <!-- <v-search class="searchBox"></v-search> -->
    <div class="vsearch">
      <span>搜索</span>
      <input
        type="text"
        placeholder="请输入"
        v-model="searchInput"
        v-on:keyup.enter="toSearch(searchInput)"
      />
    </div>
    <v-list :listArr="listArr"></v-list>
  </div>
</template>

<script>
import { likeSearch } from "../../request";
export default {
  data() {
    return {
      searchInput: "",
      listArr:[]
    };
  },
  methods: {
    toSearch(keywords) {
      likeSearch(keywords).then((res) => {
        this.listArr = res.data.list?res.data.list:[];
        
      });
    },
  },
  mounted() {
    if (this.$route.query.search) {
      likeSearch(this.$route.query.search).then((res) => {
        this.listArr = res.data.list?res.data.list:[];
      });
    }
  },
};
</script>

<style scoped>
.searchWrap {
  width: 100%;
}
.searchBox {
  padding: 0.2rem 0.2rem;
}
.vsearch {
  width: 100%;
  background-color: #ff6440;
  display: flex;
  box-sizing: border-box;
  padding: 0.2rem 0.2rem;
  /* margin: .2rem 0; */
}
.vsearch span {
  color: #fff;
}
.vsearch input {
  flex: 1;
  outline: none;
  background-color: #fff;
  color: #333;
  border: none;
  margin-left: 0.2rem;
  height: 0.4rem;
}
</style>