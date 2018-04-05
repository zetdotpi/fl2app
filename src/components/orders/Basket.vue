<template>
    <div>
        <template v-if="basketItems.length === 0">
            <p class="text-center">
                В вашей корзине ничего нет.
            </p>
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
                        <th></th>
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
                        <td><a style="cursor: pointer;" @click.prevent="deleteItem(item.id)"><span class="material-icons">delete</span></a></td>
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
        },
        deleteItem (itemId) {
            console.log('deleting item ' + itemId)
            this.$store.dispatch('deleteBasketItem', itemId)
        }
    }
}
</script>
<style>
</style>
