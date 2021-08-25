/* 路由器对象模块 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from './routes'
Vue.use(VueRouter)

const router = new VueRouter({
    mode:'history',
    //应用所有路由
    routes
})

//所有需要进行登录检查的path
const paths = ['/a','/b']
//定义全局前置守卫
router.beforeEach((to,from,next)=>{
    const path = to.path
    // 如果请求的是需要检查的路由路径, 如果用户没有登陆, 跳转到登陆界面
    if (paths.indexOf(to.path)!==-1) {
        if (!store.state.user.token) {
            return next('/login')
        }
    }
    //放行
    next()
})

export default router