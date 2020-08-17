/*
所有路由配置的数组 
 */

//vue.config.js中有路径别名../pages可简写为pages
import Msite from 'pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Order from '../pages/Order/Order.vue'
import Login from '../pages/Login/Login.vue'

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
    ]
