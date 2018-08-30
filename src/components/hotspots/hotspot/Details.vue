<template>
<div class="col">
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">Оплата</div>
                <div class="card-body">
                    <p v-if="hotspot.paidUntil != null">Оплачено до {{ hotspot.paidUntil | moment('DD.MM.YYYY') }}</p>
                    <form
                        class="form"
                        @submit.prevent="submitForm">
                        <p>Продлить</p>
                        <div class="form-group">
                            <label for="amount">На сколько месяцев?</label>
                            <input name="amount" type="number" class="form-control form-control-sm" v-model="amount">
                        </div>
                        <div class="form-group">
                            <div class="btn-group">
                                <button class="btn btn-success btn-sm">OK</button>
                                <button class="btn btn-danger btn-sm" @click.prevent="switchFormVisibility">Отмена</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card">
                <div class="card-header">Платформы</div>
                <div class="card-body">
                    <chartjs-bar
                        :scaledisplay="true"
                        :datalabel="'Platforms'"
                        :labels="hotspot.overview.platforms.labels"
                        :data="hotspot.overview.platforms.data"/>
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card">
                <div class="card-header">Браузеры</div>
                <div class="card-body">
                    <chartjs-bar
                        :scaledisplay="true"
                        :datalabel="'Browsers'"
                        :labels="hotspot.overview.browsers.labels"
                        :data="hotspot.overview.browsers.data"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            amount: 1
        }
    },
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        }
    },
    methods: {
        submitForm () {
            console.log('form accepted')
            console.log(this.hotspot.identity)
            console.log(this.amount)

            let data = {
                hotspotIdentity: this.hotspot.identity,
                amount: this.amount
            }

            this.$store.dispatch('payHotspotService', data)

            this.switchFormVisibility()
            this.amount = 1
        }
    },
    mounted () {
        this.$store.dispatch('getHotspotOverview', this.hotspot.identity)
    }
}
</script>
<style>
</style>
