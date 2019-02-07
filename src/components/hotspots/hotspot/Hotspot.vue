g<template>
    <div :key="hotspot.identity">
        <div class="row flex justify-content-center">
            <h1>{{ hotspot.name }}</h1>
        </div>
        <ul class="nav nav-tabs justify-content-center">
            <li class="nav-item">
                <router-link
                    exact
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-details',
                        params: {id: hotspot.identity}
                    }">Обзор</router-link>
                </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name:'hotspot-stats',
                        params: {id: hotspot.identity}
                    }">Статистика</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-appearance',
                        params: {id: hotspot.identity}
                    }">Внешний вид</router-link>
            </li>
            <!-- <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-settings',
                        params: {id: hotspot.identity}
                    }">Настройки</router-link>
            </li> -->
        </ul>
        <br>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
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
.fade-enter {
    opacity: 0;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}
</style>
