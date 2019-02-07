<template>
    <div id="app" class="container-fluid">
        <template v-if="this.$auth.ready()">
            <top-nav></top-nav>
            <div>
                <router-view></router-view>
            </div>
        </template>
        <template v-if="!this.$auth.ready()">
            <p>Загрузка…</p>
        </template>
    </div>
</template>

<script>
import Header from './components/Header'
export default {
    name: 'app',
    components: {
        topNav: Header
    },
    created () {
        this.$auth.ready(() => {
            console.log('auth system is ready')
            if (this.$auth.check()) {
                console.log('authentication is done. Initializing stores')
                this.$store.dispatch('initStores')
            }
        })
    }
}
</script>

<style lang="scss">
@import './app.scss'
</style>
