import Vue from 'vue'
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'
import store from './store'
import Header from 'components/Header/Header.vue'
import Star from 'components/Star/Star.vue'
import CartControl from 'components/CartControl/CartControl.vue'
import Split from 'components/Split/Split.vue'
import './mock/mockServer'
import './filters'
import VueLazyload from 'vue-lazyload'
import loading from './common/img/loading.gif'

//声明使用vue插件==》全局指令lazy
Vue.use(VueLazyload, {
  loading
})

Vue.config.productionTip = false //禁止在Vue启动时生产提示

//注册全局组件
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.component('CartControl',CartControl)
Vue.component('Split',Split)
Vue.component(Button.name, Button)


Vue.prototype.$eventBus = new Vue()
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

