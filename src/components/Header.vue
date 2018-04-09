<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <router-link class="navbar-brand" :to="{name: 'home'}">FeedLikes</router-link>
                <button class="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTop">
                    <template v-if="$auth.check()">

                        <ul class="navbar-nav mr-auto">
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'hotspots-list'}"><a class="nav-link">Хотспоты</a></router-link>
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'orders-list'}"><a class="nav-link">Заказы</a></router-link>
                            <!-- <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'contacts'}"><a class="nav-link">Контакты</a></router-link> -->

                        </ul>
                        <ul class="navbar-nav mt-2 mt-md-0">
                            <router-link
                                tag="li"
                                class="nav-item"
                                active-class="active"
                                v-if="basketItemsCount > 0"
                                :to="{name: 'basket'}">
                                <a class="nav-link">
                                    <span class="material-icons">shopping_cart</span>
                                    <span class="badge badge-pill badge-light">{{ basketItemsCount }}</span>
                                </a>
                            </router-link>
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'user-profile'}"><a class="nav-link">Мой профиль</a></router-link>
                            <li class="nav-item" active-class="active"><a class="nav-link" @click="logout" style="cursor: pointer">Выйти</a></li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="navbar-nav mr-auto">
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'login'}"><a class="nav-link">Войти</a></router-link>
                        </ul>
                    </template>
                </div>
        </nav>
    </header>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters(['basketItemsCount'])
    },
    methods: {
        logout () {
            this.$auth.logout()
        }
    }
}
</script>
<style>
</style>
