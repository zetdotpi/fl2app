<template>
    <div></div>
</template>
<script>
export default {
    mounted () {
        if (this.$auth.check()) {
            this.$router.push({name: 'hotspots-list'})
        } else {
            this.$router.push({name: 'login'})
        }
    }
}
</script>
<style>
</style>
