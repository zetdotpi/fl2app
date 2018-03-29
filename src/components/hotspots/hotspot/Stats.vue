<template>
<div class="col" id="statsContainer">
    <div class="row">
        <form class="form-inline" @submit.prevent>
            <div class="form-group">
                <label for="startDate">Start date:</label>
                <datepicker id="startDate" :bootstrapStyling="true" v-model='startDate' @input="updateStats"/>
            </div>
            <div class="form-group">
                <label for="endDate">End date:</label>
                <datepicker id="endDate" :bootstrapStyling="true" v-model='endDate' @input="updateStats"/>
            </div>
        </form>
    </div>
    <br>
    <chartjs-line
        :height="100"
        :scaledisplay="true"
        :bind="true"
        :beginzero="true"
        :labels="hotspot.stats.labels"
        :datalabel="'Logins count'"
        :data="hotspot.stats.loginData"
        :fill="true"/>
    <p>{{ loginsTotal }} logins at selected period.</p>

    <chartjs-bar
        :height="100"
        :scaledisplay="true"
        :bind="true"
        :beginzero="true"
        :labels="hotspot.stats.labels"
        :datalabel="'SMS usage'"
        :data="hotspot.stats.smsData"
        :fill="true"/>
    <p>{{ smsTotal }} sms used at selected period.</p>
</div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
export default {
    data () {
        let today = new Date()
        let weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)

        return {
            startDate: weekAgo,
            endDate: today
        }
    },
    components: {
        Datepicker
    },
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        },
        smsTotal () {
            return (this.hotspot.stats) ? this.hotspot.stats.smsData.reduce((a, b) => a + b, 0) : 0
        },
        loginsTotal () {
            return (this.hotspot.stats) ? this.hotspot.stats.loginData.reduce((a, b) => a + b, 0) : 0
        }
    },
    methods: {
        updateStats () {
            let data = {
                identity: this.$route.params.id,
                startDate: this.startDate,
                endDate: this.endDate
            }
            this.$store.dispatch('getStatistics', data)
        }
    },
    mounted () {
        this.updateStats()
    }
}
</script>
<style>
</style>
