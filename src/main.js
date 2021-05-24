import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入rem.js和reset.css
import './assets/css/reset.css'
import './assets/js/remScale'
//引入全局组件
import './components'

//引入vant
import './vant'
// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);
// Vue.use(SwipeCell);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
