<template>
    <div class="row">
        <div class="col">
            <div class="card">
                <div class="card-header">Предпросмотр</div>
                <div class="card-body">
                    <phone-preview ref="preview" :hotspotIdentity="this.hotspot.identity"></phone-preview>
                    <!-- <h3>{{ this.hotspot.appearance.title }}</h3>
                    <p>{{ this.hotspot.appearance.text }}</p>
                    <img class="img-fluid" :src="this.hotspot.appearance.logo_absolute_path">
                     --><form @submit.prevent>
                        <div class="form-group">
                            <input
                                hidden
                                style="display: none;"
                                id="logo"
                                type="file"
                                accept="image/jpg,image/png,image/jpeg"
                                @change="uploadNewLogo">
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-default" @click="requestNewLogo">Закачать новую картинку</button>
                            <button v-if="hotspot.appearance.logo_absolute_path != null" class="btn btn-danger" @click="removeLogo">Удалить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header">Параметры</div>
                <div class="card-body">
                    <form @submit.prevent>
                        <div class="form-group">
                            <label for="title">Заголовок</label>
                            <input name="title" type="text" class="form-control" v-model="title">
                        </div>
                        <div class="form-group">
                            <label for="text">Текст</label>
                            <input name="text" type="text" class="form-control" v-model="text">
                        </div>
                    </form>
                    <button class="btn btn-default" @click="updateHotspotAppearance">Сохранить</button>
                    <button class="btn btn-default" @click="reset">Сбросить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PhonePreview from './PhonePreview'

export default {
    components: { PhonePreview },
    data () {
        return {
            title: '',
            text: ''
        }
    },
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        }
    },
    methods: {
        requestNewLogo () {
            document.getElementById('logo').click()
        },

        uploadNewLogo (ev) {
            if (ev.target.files.length === 1) {
                let file = ev.target.files[0]
                let payload = {
                    identity: this.hotspot.identity,
                    file: file
                }
                this.$store.dispatch('updateHotspotLogo', payload)
                this.$refs.preview.reload()
            }
        },

        removeLogo () {
            if (confirm('Вы уверены, что хотите удалить изображение?')) {
                this.$store.dispatch('removeHotspotLogo', this.hotspot.identity)
                this.$refs.preview.reload()
            } else {
                console.log('keep logo')
            }
        },

        updateHotspotAppearance () {
            let payload = {
                identity: this.hotspot.identity,
                title: this.title,
                text: this.text
            }
            console.log(this.$refs)
            console.log(this.$refs.preview)
            this.$refs.preview.reload()
            this.$store.dispatch('updateHotspotAppearance', payload)
        },

        reset () {
            this.title = this.hotspot.appearance.title
            this.text = this.hotspot.appearance.text
        }
    },
    mounted () {
        this.reset()
    }
}
</script>
<style>
</style>
