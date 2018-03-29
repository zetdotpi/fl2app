<template>
    <div class="col">
        <template v-if="basketItems.length === 0">
            В вашей корзине ничего нет.
        </template>
        <template v-else>
            <table class="table">
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Количество</th>
                        <th>Цена</th>
                        <th>Единицы</th>
                        <th>Сумма</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="item in basketItems"
                        :key="item.id">
                        <td>{{ item.description }}<span v-if="item.hotspot != null"> ({{ item.hotspot }})</span></td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.total_price }}</td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <p class="float-right">Всего: {{ total }}₽</p>
            <br><br>
            <a class="btn btn-info float-right" @click="submitOrder">Оформить заказ</a>
        </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters(['basketItems']),
        total () {
            return this.basketItems.map(
                i => parseFloat(i.total_price)).reduce((a, b) => a + b)
        }
    },
    methods: {
        submitOrder () {
            console.log('order submitted')
            this.$store.dispatch('submitOrder')
        }
    }
}
</script>
<style>
</style>
