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
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'hotspots-list'}"><a class="nav-link">My Hotspots</a></router-link>
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'orders-list'}"><a class="nav-link">Orders</a></router-link>
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'contacts'}"><a class="nav-link">Contacts</a></router-link>

                        </ul>
                        <ul class="navbar-nav mt-2 mt-md-0">
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'basket'}"><a class="nav-link">Basket</a></router-link>
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'user-profile'}"><a class="nav-link">My Profile</a></router-link>
                            <li class="nav-item" active-class="active"><a class="nav-link" @click="logout" style="cursor: pointer">Logout</a></li>
                        </ul>
                    </template>
                    <template v-else>
                        <ul class="navbar-nav mr-auto">
                            <router-link tag="li" class="nav-item" active-class="active" :to="{name: 'login'}"><a class="nav-link">Login</a></router-link>
                        </ul>
                    </template>
                </div>
        </nav>
    </header>
</template>
<script>
export default {
    methods: {
        logout () {
            this.$auth.logout()
        }
    }
}
</script>
<style>
</style>
