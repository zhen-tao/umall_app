import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: () => import('../pages/index/index'),children:[
      {
        path:'mall', component:()=>import ('../pages/mall/mall')
      },
      {
        path:'cate', component:()=>import ('../pages/cate/cate')
      },
      {
        path:'shop', component:()=>import ('../pages/shop/shop')
      },
      {
        path:'mine', component:()=>import ('../pages/mine/mine')
      },
      {
        path:'', redirect:'mall'
      }
    ]
  }, 
  {
    path: '/login',
    component: () => import('../pages/login/login')
  }, 
  {
    path: '/register',
    component: () => import('../pages/register/register')
  }, 
  {
    path: '/list',
    component: () => import('../pages/list/list')
  }, 
  {
    path: '/detail',
    component: () => import('../pages/detail/detail')
  }, 
  {
    path: '/search',
    component: () => import('../pages/search/search')
  },
  {
    path: '/order',
    component: () => import('../pages/order/order')
  },
  {
    path: '/ress',
    component: () => import('../pages/ress/ress')
  },
  {
    path: '/address',
    component: () => import('../pages/address/address')
  },
  {
    path:'*',redirect:'/login'
  }
  
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   // ...
//   if(to.path === '/login'){
//     next();
//     return
//   }
//   next('/login')
// })
export default router