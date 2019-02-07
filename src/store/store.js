import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hotspots: [],
        initialized: false,
        basket: [],
        orders: [],
        user: {}
    },
    getters: {
        hotspots (state) {
            return state.hotspots
        },
        hotspot (state) {
            return id => state.hotspots.find(h => h.identity === id)
        },
        orders (state) {
            return state.orders
        },
        basketItems (state) {
            return state.basket
        },
        basketItemsCount (state) {
            return state.basket.length
        },
        initialized (state) {
            return state.initialized
        },
        userData (state) {
            return state.user
        }
    },
    mutations: {
        setHotspots (state, hotspots) {
            Vue.set(state, 'hotspots', hotspots)
        },
        addHotspot (state, hotspot) {
            state.hotspots.push(hotspot)
        },
        initializationDone (state) {
            state.initialized = true
        },
        setInterfaces (state, payload) {
            let identity = payload.identity
            let interfaces = payload.interfaces
            let hs = state.hotspots.find(h => h.identity === identity)
            Vue.set(hs, 'interfaces', interfaces)
        },
        setHotspot (state, hotspot) {
            let identity = hotspot.hotspotIdentity
            let hsIndex = state.hotspots.findIndex(h => h.identity === identity)
            state.hotspots.splice(hsIndex, 1, hotspot)
        },
        updateStats (state, payload) {
            let identity = payload.identity
            let stats = payload.stats
            let hs = state.hotspots.find(h => h.identity === identity)
            Vue.set(hs, 'stats', stats)
        },
        setHotspotLogo (state, payload) {
            let identity = payload.identity
            let hs = state.hotspots.find(h => h.identity === identity)
            hs.appearance.logo_absolute_path = payload.logoAbsolutePath
        },
        setBasket (state, payload) { // payload is basket items
            state.basket = payload
        },
        setOrders (state, payload) { // payload is orders
            state.orders = payload
        },
        appendOrder (state, payload) { // payload is order
            state.orders.push(payload)
        },
        clearBasket (state) {
            state.basket = []
        },
        setHotspotAppearance (state, payload) {
            let hotspot = state.hotspots.find(h => h.identity === payload.identity)
            hotspot.appearance = payload.appearance
            // Vue.set(hotspot, 'appearance', payload.appearance)
        },
        setHotspotOverview (state, payload) {
            let hotspot = state.hotspots.find(h => h.identity === payload.identity)
            hotspot.overview = payload.overview
        },
        setUserData (state, payload) {
            Vue.set(state, 'user', payload)
            // state.user = payload
        }
    },
    actions: {
        initStores ({commit, dispatch}) {
            dispatch('fetchHotspots')
            dispatch('fetchBasket')
            dispatch('fetchOrders')
            dispatch('fetchUser')
            commit('initializationDone')
        },

        fetchUser (context) {
            Vue.axios.get('/auth/user')
                .then(response => {
                    let userData = response.data.data
                    context.commit('setUserData', userData)
                })
                .catch(err => {
                    console.log('cannot fetch user data')
                    console.log(err)
                })
        },

        fetchHotspots (context) {
            if (context.getters.initialized) {
                return
            }

            Vue.axios.get('/hs')
                .then(
                    response => {
                        let hotspots = response.data.hotspots
                        // console.log(hotspots)
                        context.commit('setHotspots', hotspots)
                    },
                    error => {
                        console.log(error)
                    }
                )
        },

        registerNewHotspot (context, hotspotName) {
            let data = {name: hotspotName}
            Vue.axios.post('/hs', data)
                .then((response) => {
                    // console.log('responseOk')
                    let hotspot = response.data.hotspot
                    // console.log(hotspot)
                    context.commit('addHotspot', hotspot)
                    Vue.router.push({name: 'hotspot-connect', params: {id: hotspot.identity}})
                }, (error) => {
                    console.log(error)
                })
        },

        setupHotspotConnection (context, payload) {
            let data = payload.credentials
            Vue.axios.post('/hs/' + payload.identity + '/connect', data)
                .then(response => {
                    Vue.router.push({name: 'hotspot-setup', params: {id: payload.identity}})
                })
                .catch(error => {
                    console.log('cannot setup connection for hotspot ' + payload.hotspotIdentity)
                    console.log(error)
                })
        },

        getInterfacesList (context, hotspotIdentity) {
            Vue.axios.get('/hs/' + hotspotIdentity + '/configure')
                .then(response => {
                    // console.log(response)
                    context.commit('setInterfaces',
                        {
                            identity: hotspotIdentity,
                            interfaces: response.data
                        })
                }, error => {
                    console.log(error)
                })
        },

        getHotspotOverview (context, hotspotIdentity) {
            Vue.axios.get('/hs/' + hotspotIdentity + '/overview')
                .then(response => {
                    context.commit('setHotspotOverview',
                        {
                            identity: hotspotIdentity,
                            overview: response.data
                        })
                }, error => {
                    console.log(error)
                })
        },

        setupHotspot (context, payload) {
            Vue.axios.post('/hs/' + payload.hotspotIdentity + '/configure', {ifnames: payload.interfacesList})
                .then(response => {
                    let hotspot = response.data.hotspot
                    context.commit('setHotspot', hotspot)
                    Vue.router.push({name: 'hotspot-appearance', params: {id: hotspot.identity}})
                }, error => {
                    console.log(error)
                })
        },

        getStatistics (context, payload) {
            let identity = payload.identity
            let startDate = payload.startDate
            let endDate = payload.endDate

            Vue.axios.get('/hs/' + identity + '/stats', {params: {start: startDate, end: endDate}})
                .then(response => {
                    context.commit('updateStats', {identity: identity, stats: response.data.stats})
                }, error => {
                    console.log(error)
                })
        },

        updateHotspotLogo (context, payload) {
            let file = payload.file
            let identity = payload.identity

            Vue.axios.post('/hs/' + identity + '/logo', file, {headers: {'Content-Type': file.type}})
                .then(response => {
                    let logoAbsolutePath = response.data.logo_absolute_path
                    let data = {
                        identity,
                        logoAbsolutePath
                    }
                    context.commit('setHotspotLogo', data)
                }, response => {
                    console.log('error uploading new logo')
                    console.log(response)
                })
        },

        removeHotspotLogo (context, hotspotIdentity) {
            Vue.axios.delete('/hs/' + hotspotIdentity + '/logo')
                .then(response => {
                    context.commit('setHotspotLogo', {
                        identity: hotspotIdentity,
                        logoAbsolutePath: null
                    })
                }, response => {
                    console.log('error removing logo')
                    console.log(response)
                })
        },

        fetchBasket (context) {
            Vue.axios.get('/basket')
                .then(response => {
                    context.commit('setBasket', response.data.items)
                }, response => {
                    console.log('cannot fetch basket')
                    console.log(response)
                })
        },

        fetchOrders (context) {
            Vue.axios.get('/orders')
                .then(response => {
                    context.commit('setOrders', response.data.orders)
                }, response => {
                    console.log('cannot fetch orders')
                    console.log(response)
                })
        },

        payHotspotService (context, payload) {
            let data = {
                product_name: 'hotspotService_monthly',
                count: payload.amount,
                hotspot: payload.hotspotIdentity
            }

            Vue.axios.post('/basket', data)
                .then(response => {
                    context.commit('setBasket', response.data.items)
                }, response => {
                    console.log('cannot add service payment to basket')
                    console.log(response)
                })
        },

        submitOrder (context) { // payload is null
            Vue.axios.post('/orders')
                .then(response => {
                    let order = response.data.order
                    context.commit('appendOrder', order)
                    context.commit('clearBasket')
                    Vue.router.push({name: 'orders-list'})
                })
                .catch(e => {
                    console.log('error posting order')
                    console.log(e)
                })
        },

        downloadInvoice (context, path) {
            Vue.axios.get(path, {type: 'application/pdf'})
                .then(response => {
                    let blob = new Blob([response.data], {type: 'application/pdf'})
                    let url = window.URL.createObjectURL(blob)
                    window.open(url)
                })
                .catch(e => {
                    console.log('cannot download invoice')
                    console.log(e)
                })
        },

        setOrderIsPaid (context, orderId) {
            Vue.axios.post(
                '/orders/' + orderId + '/action/',
                {action: 'confirm_payment'})
                .then(response => {
                    context.dispatch('fetchOrders')
                })
                .catch(err => {
                    console.log('cannot set order ' + orderId + ' status to paid')
                    console.log(err)
                })
        },

        deleteBasketItem (context, itemId) {
            Vue.axios.delete('/basket/' + itemId)
                .then(response => {
                    context.dispatch('fetchBasket')
                })
                .catch(err => {
                    console.log('cannot delete item ' + itemId + ' from basket')
                    console.log(err)
                })
        },

        updateHotspotAppearance (context, payload) {
            Vue.axios.put('/hs/' + payload.identity + '/appearance', {title: payload.title, text: payload.text})
                .then((response) => {
                    let appearance = response.data.appearance
                    context.commit('setHotspotAppearance', {identity: payload.identity, appearance: appearance})
                })
                .catch((err) => {
                    console.log('cannot set hotspot appearance')
                    console.log(err)
                })
        },

        updateUserData (context, payload) {
            console.log(payload)
            Vue.axios.put('/users/' + payload.email, payload.data)
                .then(response => {
                    context.commit('setUserData', response.data.user)
                })
                .catch(err => {
                    console.log('cannot update user profile')
                    console.log(err)
                })
        },

        getTargetingFile (context, payload) {
            // payload.identity, payload.targetType
            Vue.axios.get('/hs/' + payload.identity + '/targeting', {
                params: {
                    type: payload.targetType
                }
            })
        }
    }
})
