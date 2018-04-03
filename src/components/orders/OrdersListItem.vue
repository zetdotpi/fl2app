<template>
    <div
        :class="getClassFromStatus(order.status)"
        class="list-group-item">
        <div class="row d-flex justify-content-between align-items-center">
            <a href="#" @click="toggleDetails">ФЛ{{ order.id }} (от {{ order.created_datetime|moment('DD.MM.YYYY hh:mm:ss') }})</a>
            на сумму {{ order.total }}₽
            <span class="badge badge-pill badge-light">{{ getStatusString(order.status) }}</span>
            <a
                class="btn-sm btn-light"
                @click="downloadInvoice">Скачать счет</a>
            <a
                v-if="$auth.user().role === 'admin' & order.status === 'not_paid'"
                class="btn-sm btn-success"
                @click="setOrderAsPaid">Заказ оплачен</a>
        </div>
        <div v-if="showDetails">
            <br>
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
                        v-for="item in order.items"
                        :key="item.id">
                        <td>{{ item.description }}<span v-if="item.hotspot != null"> ({{ item.hotspot }})</span></td>
                        <td>{{ item.amount }}</td>
                        <td>{{ item.price }}</td>
                        <td>{{ item.unit }}</td>
                        <td>{{ item.total_price }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    props: ['order'],
    data () {
        return {
            showDetails: false
        }
    },
    methods: {
        toggleDetails () {
            this.showDetails = !this.showDetails
        },
        getClassFromStatus (status) {
            switch (status) {
            case 'not_paid':
                return ''
            case 'paid':
                return 'list-group-item-info'
            case 'completed':
                return 'list-group-item-success'
            case 'cancelled':
                return 'list-group-item-dark'
            }
        },

        getStatusString (status) {
            switch (status) {
            case 'not_paid':
                return 'ожидает оплаты'
            case 'paid':
                return 'оплачен, ожидает обработки'
            case 'completed':
                return 'выполнен'
            case 'cancelled':
                return 'отменен'
            }
        },

        downloadInvoice () {
            this.$store.dispatch('downloadInvoice', this.order.invoice_pdf_path)
        },
        setOrderAsPaid () {
            if (confirm('Вы уверены, что хотите отметить этот счет ОПЛАЧЕННЫМ?')) {
                this.$store.dispatch('setOrderIsPaid', this.order.id)
                console.log('order ' + this.order.id + ' status is set to PAID')
            } else {
                console.log('cancelled')
            }
        }
    }
}
</script>
<style>
</style>
