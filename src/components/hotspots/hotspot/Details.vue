<template>
    <h1>Details {{ this.$route.params.id }}</h1>
</template>
<script>
export default {
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        }
    }
}
</script>
<style>
</style>
