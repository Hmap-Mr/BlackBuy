import Vue from 'vue'
import App from './App.vue'

// 导入样式
import './assets/statics/site/css/style.css'
// 导入axios
import axios from 'axios'
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import index from './components/index.vue'
import cart from './components/cart.vue'
import detail from './components/detail.vue'

// 设置路由规则
let routes = [
  { path:"/", component:index },
  { path:"/index", component:index },
  { path:"/cart", component:cart },
  { path:"/detail/:id", component:detail },
]
// 创建路由对象
const router = new VueRouter({
    routes,
})
// Vue.config.productionTip = true;

Vue.prototype.$axios = axios;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
