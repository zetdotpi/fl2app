import router from '@websanova/vue-auth/drivers/router/vue-router.2.x'
import http from '@websanova/vue-auth/drivers/http/axios.1.x'
import Vue from 'vue'
import VueAuth from '@websanova/vue-auth'

Vue.use(VueAuth, {
    router: router,
    http: http,
        loginData: {
        url: 'auth',
        method: 'POST'
    },
    rolesVar: 'role',
    auth: {
        request(req, token) {
            this.options.http._setHeaders(req, {Authorization: 'JWT ' + token})
        },
        response(res) {
            return (res.data.token || null)
        },
        success () {
            console.log('authentication succeeded')
        }
    },
    refresh: {
        success () {
            console.log('refresh succeedede')
        }
    }
    refreshData: {
        enabled: true
    }
})