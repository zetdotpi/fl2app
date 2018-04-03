<template>
    <div class="col">
        <div class="row">
            <h1>Настройка хотспота</h1>
        </div>
        <!-- <transition name="fade" mode="out-in"> -->
        <component :is="currentComponent" :interfaces="hotspot.interfaces" :message="currentMsg" @setupStarted="setupStarted = true"></component>
        <!-- </transition> -->
    </div>
</template>
<script>
import VueSimpleSpinner from 'vue-simple-spinner'
import InterfacesList from './InterfacesList'

export default {
    components: {
        VueSimpleSpinner,
        InterfacesList
    },
    data () {
        return {
            selectedInterfaces: [],
            setupStarted: false
        }
    },
    computed: {
        currentMsg () {
            return (this.setupStarted) ? 'Setup in progress' : 'Loading...'
        },
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        },
        currentComponent () {
            if (this.hotspot == null || !this.hotspot.hasOwnProperty('interfaces') || this.setupStarted) {
                return VueSimpleSpinner
            } else {
                return InterfacesList
            }
        }
    },
    mounted () {
        this.$store.dispatch('getInterfacesList', this.$route.params.id)
    }
}
</script>
<style>
</style>
