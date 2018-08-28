<template>
<router-link
    :to="{ name: 'hotspot-details', params: {id: this.hs.identity} }"
    :key="hs.identity"
    :class="{ 'nav-link': true, 'expires-soon': expiresSoon, 'is-expired': expired }"
    active-class="active">{{ hs.name || "[UNDEFINED]" }}
</router-link>
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
.expires-soon {
    background-color: #F2F5A9;
}

.is-expired {
    background-color: #FE642E !important;
    color: white;
}
</style>
