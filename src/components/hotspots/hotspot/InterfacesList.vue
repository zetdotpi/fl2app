<template>
<div class="col">
    <div class="row">
        <div class="col">
            <ul class="list-group" v-if="interfaces.ethers.length > 0">
                <li class="list-group-item" v-for="(iface, index) in interfaces.ethers" :key="index">
                    <input type="checkbox" v-model="selectedInterfaces" :value="iface.name" :disabled="!iface.enabled">
                    <label :for="iface.name">{{ iface.name }}</label>
                </li>
            </ul>
            <p v-else>Ethernet интерфейсы недоступны</p>
        </div>
        <div class="col">
            <ul class="list-group" v-if="interfaces.wlans.length > 0">
                <li class="list-group-item" v-for="iface in interfaces.wlans" :key="iface.name">
                    <input type="checkbox" v-model="selectedInterfaces" :value="iface.name" :disabled="!iface.enabled">
                    <label>{{ iface.name }}</label>
                </li>
                <li class="list-group-item">
                    <input type="checkbox" v-model="selectedInterfaces" value="add_virtualAP">
                    <label>Добавить виртуальную точку доступа</label>
                </li>
            </ul>
            <p v-else>Беспроводные интерфейсы недоступны</p>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">
            <button class="btn btn-primary" @click="setupInterfaces">Начать настройку</button>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {
            selectedInterfaces: []
        }
    },
    methods: {
        setupInterfaces () {
            this.$emit('setupStarted')

            let data = {
                hotspotIdentity: this.$route.params.id,
                interfacesList: this.selectedInterfaces
            }
            this.$store.dispatch('setupHotspot', data)
        }
    },
    props: ['interfaces']
}
</script>
