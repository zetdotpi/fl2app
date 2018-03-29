import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './components/Home'
import Contacts from './components/Contacts'

import List from './components/hotspots/List'
import Overview from './components/hotspots/Overview'
import Register from './components/hotspots/Register'

import Hotspot from './components/hotspots/hotspot/Hotspot'
import Details from './components/hotspots/hotspot/Details'
import Stats from './components/hotspots/hotspot/Stats'
import Settings from './components/hotspots/hotspot/Settings'
import Appearance from './components/hotspots/hotspot/Appearance'
import ConnectionSetup from './components/hotspots/hotspot/ConnectionSetup'
import Setup from './components/hotspots/hotspot/Setup'

import Profile from './components/user/Profile'

import OrdersList from './components/orders/OrdersList'
import Basket from './components/orders/Basket'

import Login from './components/auth/Login'

export const routes = [
    {
        name: 'home',
        path: '',
        component: Home
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'contacts',
        path: '/contacts',
        component: Contacts
    },
    {
        path: '/hotspots',
        component: List,
        children: [
            {
                name: 'hotspots-list',
                path: '',
                component: Overview
            },
            {
                path: ':id',
                component: Hotspot,
                children: [
                    {
                        name: 'hotspot-details',
                        path: '',
                        component: Details
                    },
                    {
                        name: 'hotspot-stats',
                        path: 'stats',
                        component: Stats
                    },
                    {
                        name: 'hotspot-appearance',
                        path: 'appearance',
                        component: Appearance
                    },
                    {
                        name: 'hotspot-settings',
                        path: 'settings',
                        component: Settings
                    }
                ]
            },
            {
                name: 'hotspot-connect',
                path: ':id/connect',
                component: ConnectionSetup
            },
            {
                name: 'hotspot-setup',
                path: ':id/setup',
                component: Setup
            },
            {
                name: 'hotspots-new',
                path: 'register',
                component: Register
            }
        ]
    },
    {
        name: 'user-profile',
        path: '/profile',
        component: Profile
    },
    {
        name: 'orders-list',
        path: '/orders',
        component: OrdersList
    },
    {
        name: 'basket',
        path: '/basket',
        component: Basket
    },
    {
        path: '*',
        redirect: {name: 'home'}
    }
]
// router.beforeEach(
//     (to, from, next) => {
//         if (to.name === 'login') {
//             next()
//         }
//         else if (!Vue.auth.check()) {
//             next({name: 'login'})
//         }
//         next()
//     }
// )
Vue.use(VueRouter)
var router = new VueRouter({
    routes,
    mode: 'history'
})
Vue.router = router

export default router
