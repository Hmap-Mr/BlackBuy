// 导入vue
import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 导入组件
import index from './components/index.vue'
import cart from './components/cart.vue'
import detail from './components/detail.vue'
import userContainer from './components/userContainer.vue'
import userIndex from './components/userIndex.vue'
import userOrder from './components/userOrder.vue'
import userDetail from './components/userDetail.vue'

// 设置路由规则
let routes = [
  { path:"/", component:index },
  { path:"/index", component:index },
  { path:"/cart", component:cart },
  { path:"/detail/:id", component:detail },
  { path:"/user", component:userContainer, children:[
    { path:"Index", component:userIndex },
    { path:"/", component:userIndex },
    { path:"Order", component:userOrder },
    { path:"Detail", component:userDetail },
  ] },
  
]
// 创建路由对象
const router = new VueRouter({
    routes,
})

export default router;