<template>
    <div>
        <div class="row">
            <h1>Register new hotspot</h1>
        </div>
        <div class="row justify-content-center">
            <form>
                <div class="form-group">
                    <label for="hotspotName">Hotspot name:</label>
                    <input type="text" name="hotspotName" class="form-control" v-model="hotspotName">
                </div>
                <button class="btn btn-primary btn-block" @click.prevent="registerNewHotspot(hotspotName)">Register</button>
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
