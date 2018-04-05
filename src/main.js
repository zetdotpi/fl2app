import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAuth from '@websanova/vue-auth'

import 'chart.js'
import 'hchs-vue-charts'
import VueMoment from 'vue-moment'

import App from './App.vue'

import store from './store/store'
import router from './router'

Vue.use(window.VueCharts)
Vue.use(VueMoment)

Vue.use(VueAxios, axios.create({
    baseURL: process.env.REQ_BASE_URL,
    headers: {'Content-Type': 'application/json;charset=utf-8'}
}))

Vue.use(VueAuth, {
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x'),
    loginData: {
        url: 'auth',
        method: 'POST'
    },
    rolesVar: 'role',
    auth: {
        request (req, token) {
            this.options.http._setHeaders(req, {Authorization: 'JWT ' + token})
        },
        response (res) {
            return (res.data.token || null)
        }
    }
})
new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})
