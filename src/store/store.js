import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hotspots: [],
        initialized: false,
        basket: [],
        orders: []
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
            // for (let order of payload) {
            //     console.log(order)
            //     order.created_datetime = Date(order.created_datetime)
            //     state.orders.push(order)
            // }
            state.orders = payload
        },
        appendOrder (state, payload) { // payload is order
            state.orders.push(payload)
        },
        clearBasket (state) {
            state.basket = []
        }
    },
    actions: {
        initStores ({commit, dispatch}) {
            dispatch('fetchHotspots')
            dispatch('fetchBasket')
            dispatch('fetchOrders')
            commit('initializationDone')
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
                }, error => {
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
                    console.log(response)
                    context.dispatch('fetchOrders')
                })
                .catch(err => {
                    console.log('cannot set order ' + orderId + ' status to paid')
                    console.log(err)
                })
        }
    }
})
