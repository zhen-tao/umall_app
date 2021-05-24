<template>
  <div class="resswrap">
    <v-header title="编辑地址" :back="true"  v-if="$route.query.ressedit"></v-header>
    <v-header title="新建地址" :back="true" v-else></v-header>
    <div class="box">
            <div><span class="span"><i>姓名:</i></span><input type="text" v-model="ressinfo.username"></div>
            <div><span class="span"><i>电话:</i></span><input type="text" v-model="ressinfo.userphone" ></div>
            <div><span class="span"><i>地区:</i></span><input type="text" v-model="ressinfo.location" ></div>
            <div><span class="span"><i>详细地址:</i></span><input type="text" v-model="ressinfo.useraddress" ></div>
    </div>
    <div class="box1">
        <div class="box_l"><span class="span1">设为默认地址</span></div><div class="box_r"> <van-switch v-model="checked" class="switch"/></div>
    </div>
    <div class="add" v-if="$route.query.ressedit">
        <van-button round type="danger" size="large" @click="edit($route.query.ressedit,{...ressinfo,status:checked?1:0})">保存</van-button>
        {{checked?1:0}}{{ressinfo.status}}
    </div>
    <div class="add" v-else>
        <van-button round type="danger" size="large" @click="add({...ressinfo,status:checked?1:0})">保存</van-button>
        <!-- {{checked?1:0}}{{ressinfo.status}} -->
    </div>
  </div>
</template>

<script>
import { address, editRess, selectRess } from '../../request';
export default {
  data() {
      return {
          checked:false,
          ressinfo:{
              username:"",
              userphone:"",
              location:"",
              useraddress:"",
              status:this.checked?1:0
          }
      }
  },
  methods: {
      add(user){
          address(user).then(res=>{
            //   console.log(this.checked?1:0);
            if(res.data.code == 200){
                  this.$toast(res.data.msg)
                  this.$router.go(-1)
              }
          })
      },
      edit(id,user){
          editRess(id,user).then(res=>{
              if(res.data.code == 200){
                  this.$toast(res.data.msg)
                  this.$router.go(-1)
              }
          })
      }
  },
  mounted() {
      if(this.$route.query.ressedit){
          selectRess(this.$route.query.ressedit).then(res=>{
              this.ressinfo = res.data.list[0];
              
          })
        // console.log(1);
      }
    //   console.log(this.$route ,'2222');
  },
  
};
</script>

<style scoped>
.resswrap{
    width: 100%;
    
}
.box{
    width: 100%;
    font-size: .3rem;
    box-sizing: border-box;
    padding: .2rem .3rem;
}

.box div{
    width: 100%;
    height: 0.5rem;
    line-height: .5rem;
    display: flex;
    margin: .4rem 0;
    border-bottom: 2px solid #555;
}
.box  div .span{
    width: 1.8rem;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    /* text-align-last: justify; */
}
.box div .span i{
    width: 100%;
    text-align-last: justify;
    box-sizing: border-box;
    padding: 0 .2rem;
}

.box div input{
    flex: 1;
    box-sizing: border-box;
    padding: 0 .2rem;
}
/* .van-switch{
    width: 1.2rem !important
} */
.box1{
    width: 100%;
    height: 0.7rem;
    
    font-size: .3rem;
    display: flex;

}
.box_l{
    width: 4rem;
    font-size: .4rem;
    line-height: .7rem;
    box-sizing: border-box;
    padding: 0 .3rem;
}
.box_r{
    flex: 1;
}
.add{
    margin-top: 2rem;
    font-size: .4rem;
}
</style>