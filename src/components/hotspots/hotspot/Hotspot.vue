<template>
    <div :key="hotspot.identity">
        <div class="row flex justify-content-between align-items-center">
            <h1>{{ hotspot.name }}</h1>
            <p v-if="hotspot.paidUntil != null">Оплачено до {{ hotspot.paid_until|moment('DD.MM.YYYY') }}</p>
            <a
                href="#"
                class="btn btn-success btn-sm"
                v-if="!this.formVisible"
                @click="switchFormVisibility">Оплатить</a>
            <form
                class="form-inline"
                v-if="this.formVisible"
                @submit.prevent="submitForm">
                <label for="amount">На сколько месяцев?</label>
                <input name="amount" type="number" class="col-md-2 form-control form-control-sm" v-model="amount">
                <div class="btn-group">
                    <button class="btn btn-success btn-sm">OK</button>
                    <button class="btn btn-danger btn-sm">Отмена</button>
                </div>
            </form>
        </div>
        <ul class="nav nav-pills justify-content-center">
            <li class="nav-item">
                <router-link
                    exact
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-details',
                        params: {id: hotspot.identity}
                    }">Overview</router-link>
                </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name:'hotspot-stats',
                        params: {id: hotspot.identity}
                    }">Statistics</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-appearance',
                        params: {id: hotspot.identity}
                    }">Appearance</router-link>
            </li>
            <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{
                        name: 'hotspot-settings',
                        params: {id: hotspot.identity}
                    }">Settings</router-link>
            </li>
        </ul>
        <br>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formVisible: false,
            amount: 1
        }
    },
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        }
    },
    methods: {
        switchFormVisibility () {
            this.formVisible = !this.formVisible
        },
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
