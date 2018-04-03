<template>
    <div>
        <div class="row">
            <h1>Добавить новый хотспот</h1>
        </div>
        <div class="row justify-content-center">
            <form>
                <div class="form-group">
                    <label for="hotspotName">Название хотспота:</label>
                    <input type="text" name="hotspotName" class="form-control" v-model="hotspotName">
                </div>
                <button class="btn btn-primary btn-block" @click.prevent="registerNewHotspot(hotspotName)">Добавить</button>
            </form>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    data () {
        return {
            hotspotName: ''
        }
    },
    methods: {
        ...mapActions(['registerNewHotspot'])
    }
}
</script>
<style>
</style>
