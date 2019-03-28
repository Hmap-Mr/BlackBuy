import Vue from 'vue'
import App from './App.vue'

// 导入 饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
// 导入样式
import './assets/statics/site/css/style.css'
// 导入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://111.230.232.110:8899";
// 导入moment
import moment from 'moment';
Vue.filter("formatTime",function(value,temp="YYYY-MM-DD"){
  return moment(value).format(temp)
})

// 导入路由
import router from './router.js'
// Vue.config.productionTip = true;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
