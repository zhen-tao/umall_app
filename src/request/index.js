import axios from 'axios'
import Vue from 'vue'
import router from '../router'

//开发环境8080
if (process.env.NODE_ENV === "development") {
    Vue.prototype.$api = "http://localhost:3000"
}
if (process.env.NODE_ENV === "production") {
    Vue.prototype.$api = ''
}

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
//请求拦截:每一次发请求给后端，需要统一加的参数在请求拦截中做，比如加token
//请求拦截return的内容就是后端收到的真正的请求信息

axios.interceptors.request.use(config=>{
    localStorage.getItem("userInfo")&&(config.headers.authorization=JSON.parse(localStorage.getItem('userInfo')).token)
    return config
})

//响应拦截:每一次，后端返回的数据，统一操作在响应拦截中处理
//响应拦截return的内容就是组件收到的数据

axios.interceptors.response.use(res => {
    //统一处理失败
    // if(res.data.msg !== 200){
    //     alert(res.data.msg)
    // }
    // this.$toast(res.data.msg)
    console.log("本次请求路径是:" + res.config.url)
    console.log(res);
    return res;
})

//注册

export let reqRegister = (data) => axios({
    url: "/api/register",
    method: "POST",
    data
})
//登录 
export let reqLogin = (user) => axios.post("/api/login", user)

//获取首页导航栏
export let reqCate = () => axios.get('/api/getcate')
// 获取列表
export let reqCatelist = (id) => axios({
    url: "/api/getgoodlist",
    method: 'get',
    params: {
        cateid: id,
        type: 1
    }
})
//商品首页信息
export let homeGoods = ()=>axios.get("/api/gethortgoods")
//首页轮播图
export let homeBanner = ()=>axios.get("/api/getbanner")
//限时秒杀
export let seckillTime = ()=>axios.get("/api/getseckill")


//详情跳转确认订单
//获取一个商品信息
export let getOneShop = (id) => axios({
    url: "/api/getgoodsinfo",
    params: {
        id
    }
})
//加入购物车
export let addShop = (id) => {
    // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return axios({
        url: "/api/cartadd",
        method: "POST",
        data: {
            uid:userInfo.uid,
            goodsid:id,
            num: 1,
        },
        // headers:{
        //     "authorization": userInfo.token
        // }
    })
}
//购物车列表
export let shopLiat = ()=>{
    // let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    return axios({
        url:"/api/cartlist",
        params:{
            uid:userInfo.uid
        },
        // headers:{
        //     "authorization": userInfo.token
        // }
    })
}
//购物车删除
export let shopDel = (id)=>axios({
    url:"/api/cartdelete",
    method:"POST",
    data:{
        id
    },
    // headers:{
    //     "authorization": userInfo.token
    // }
})
//购物车修改
export let editShop = (id,type)=>axios({
    url:"/api/cartedit",
    method:"POST",
    data:{
        id,
        type
    }
})
//分类页
export let getCate = ()=>axios.get("/api/getcates")


//模糊搜索
export let likeSearch = (keywords)=>axios({
    url:"/api/search",
    method:"get",
    params:{
        keywords
    }
})

//请求地址
export let ressList = ()=>axios({
    url:"/api/addresslist",
    params:{
        uid:userInfo.uid
    }
})
//添加地址

export let address=(ressinfo)=>axios({
    url:"/api/addressadd",
    method:"post",
    data:{
        uid:userInfo.uid,
        ...ressinfo
    }
})
//编辑地址

export let editRess=(id,ressinfo)=>axios({
    url:"/api/addressedit",
    method:"post",
    data:{
        id:id,
        ...ressinfo
    }
})
//删除地址
export let delRess = (id)=>axios({
    url:"/api/addressremove",
    method:"post",
    data:{
        id
    }
})
//查询一条地址

export let selectRess = (id)=>axios({
    url:"/api/addresslist",
    method:"get",
    params:{
        uid:userInfo.uid,
        id,
    }
})

//确认订单
export let submitOrder = (orderInfo)=>axios({
    url:"/api/orderadd",
    method:"post",
    data:{
        uid:userInfo.uid,
        ...orderInfo,
    }
})

