<template>
    <div :class="{ 'card': true, 'border-warning': expiresSoon, 'border-danger': expired }">
        <router-link
            tag="div"
            :class="{ 'card-header': true, 'bg-warning': expiresSoon, 'bg-danger': expired }"
            :to="{ name: 'hotspot-details', params: {id: this.hs.identity} }"
            :key="hs.identity">
            <h5>{{ hs.name || "[UNDEFINED]" }}</h5>
        </router-link>
        <div class="card-body">
            Today: {{ hs.visitors.today }}, Week: {{ hs.visitors.week }}, Month: {{ hs.visitors.month }}
        </div>
    </div>
</template>
<script>
export default {
    props: ['hs'],
    computed: {
        daysUntilExpiration () {
            return Math.floor((new Date(this.hs.paidUntil) - new Date()) / 86400000)
        },

        expiresSoon () {
            return (this.daysUntilExpiration < 10 && this.daysUntilExpiration > 0)
        },

        expired () {
            return this.daysUntilExpiration <= 0
        }
    }
}
</script>
<style scoped>
    .card {
        margin-top: 15px;
        padding-bottom: 15px;
    }
</style>
