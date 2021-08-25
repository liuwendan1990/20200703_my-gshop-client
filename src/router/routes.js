/*
所有路由配置的数组 
 */

//vue.config.js中有路径别名../pages可简写为pages
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Ratings from '../pages/Shop/Ratings.vue'
import Info from '../pages/Shop/Info.vue'

// 路由守卫测试
import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'

export default[
        {
            path: '/',
            redirect: '/msite'
        },
        {
            path: '/msite',
            component: Msite,
            meta:{
                showFooter:true
            }
        },
        {
            path: '/order',
            component: Order,
            meta:{
                showFooter:true
            }
        }
        ,
        {
            path: '/profile',
            component: Profile,
            meta:{
                showFooter:true
            }
        }
        ,
        {
            path: '/search',
            component: Search,
            meta:{
                showFooter:true
            }
        },
        {
            path: '/login',
            component: Login,
            meta:{
                showFooter:false
            }
        },
        {
            path:'/shop',
            component:Shop,
            children:[
                {
                    path: '/shop/goods',
                    component: Goods
                },
                {
                    path: '/shop/ratings',
                    component: Ratings
                },
                {
                    path: '/shop/info',
                    component: Info
                },
                {
                    path: '',
                    redirect: '/shop/goods'
                }
            ],
            meta:{
                showFooter:false
            }
        },
        {
            path: '/a',
            component: A
            }, 
            {
            path: '/b',
            component: B,
            children: [{
                path: '/b/b1',
                component: B1
                },
                {
                path: '/b/b2',
                component: B2
                },
            ]
        },
    ]
