<template>
    <main class="row">
        <div class="col-md-4" v-for="hs in hotspots" :key="hs.identity">
            <card-item :hs="hs"/>
        </div>
    </main>
    <!--
    <div class="row">
        <nav class="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar justify-content">
            <ul class="nav nav-pills flex-column">
                <router-link tag="li" class="nav-item btn btn-info" :to="{name: 'hotspots-new'}">Добавить новый</router-link>
                <li v-for="hs in hotspots" :key="hs.identity" class="nav-item">
                    <list-item :hs="hs"/>
                </li>
            </ul>
        </nav>
        <main class="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
            <transition name="fadeRight" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
    </div>
    -->
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
// import ListItem from './ListItem'
import CardItem from './CardItem'

export default {
    // components: { ListItem },
    components: { CardItem },
    computed: {
        ...mapGetters(['hotspots'])
    },
    methods: {
        ...mapActions(['fetchHotspots'])
    },
    mounted () {
        this.fetchHotspots()
    }
}
</script>
<style>
</style>
<style scoped>
.fadeRight-enter {
    opacity: 0;
}
.fadeRight-enter-active {
    transition: opacity .3s;
    animation: outRight .3s ease-in reverse;
}
.fadeRight-leave-active {
    transition: opacity .3s;
    animation: outRight .3s ease-out forwards;
}

@keyframes outRight {
    from {
        transform: translateX(0px);
    }
    to {
        transform: translateX(20px);
    }
}
/*    body {
    padding-top: 50px;
}
*/
h1 {
    margin-bottom: 20px;
    padding-bottom: 9px;
    border-bottom: 1px solid #eee;
}

.sidebar {
    position: fixed;
    top: 51px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    border-right: 1px solid #eee;
}

.sidebar {
    padding-left: 0;
    padding-right: 0;
}

.sidebar .nav {
    margin-bottom: 20px;
}

.sidebar .nav-item {
    width: 100%;
}

.sidebar .nav-item + .nav-item {
    margin-left: 0;
}

.sidebar .nav-link {
    border-radius: 0;
}

.placeholders {
    padding-bottom: 3rem;
}

.placeholder img {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}
</style>
