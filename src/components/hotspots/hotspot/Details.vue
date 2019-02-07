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
    <br>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">Выгрузка данных для таргетинга</div>
                <div class="card-body">
                    <div class="btn-group">
                        <button class="btn btn-default adw" @click="getTargetingFile('adwords')">Google Adwords</button>
                        <button class="btn btn-default fb" @click="getTargetingFile('facebook')">Facebook/IG</button>
                        <button class="btn btn-default ya" @click="getTargetingFile('yandex')">Yandex</button>
                        <button class="btn btn-default vk" @click="getTargetingFile('vk')">VK</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import fileDownload from 'js-file-download'
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
        },
        getTargetingFile (target) {
            this.axios.get('/hs/' + this.hotspot.identity + '/targeting', {
                params: { type: target }
            })
                .then(res => {
                    let disposition = res.headers['content-disposition']
                    let filename = decodeURI(disposition.match(/filename="(.*)"/)[1])
                    fileDownload(res.data, filename)
                })
                .catch(e => { console.log(e) })
        }
    },
    mounted () {
        this.$store.dispatch('getHotspotOverview', this.hotspot.identity)
    }
}
</script>
<style scoped>
    .fb {
        background-color: #8b9dc3;
    }
    .vk {
        background-color: #7C90A6;
    }
    .adw {
        background-color: #13a365;
    }
    .ya {
        background-color: #ffdb4d;
    }
</style>
