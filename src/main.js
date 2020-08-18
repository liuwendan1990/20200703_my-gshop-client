import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'

import './api'
import './validate.js'

Vue.config.productionTip = false //禁止在Vue启动时生产提示

//注册全局组件
Vue.component('Header',Header)
Vue.component('Star',Star)


// new Vue({
//   render: h => h(App),
// }).$mount('#app')

new Vue({
  el:'#app',
  render:h=>h(App),//幻术返回组件标签<App />
  router,//配置路由器
  store
})
// new Vue({
//   el:'#app',
//   components:{
//     App
//   },
//   template:'<App/>'
// })

