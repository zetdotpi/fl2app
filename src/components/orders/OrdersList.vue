<template>
    <div class="col">
        <div class="list-group">
            <OrdersListItem
                v-for="order in orders"
                :order="order"
                :key="order.id"/>
        </div>
    </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import OrdersListItem from './OrdersListItem'
export default {
    components: {
        OrdersListItem
    },
    computed: {
        ...mapGetters(['orders'])
    },
    methods: {
        ...mapActions(['fetchOrders'])
    },
    mounted () {
        this.fetchOrders()
    }
}
</script>
<style>
</style>
