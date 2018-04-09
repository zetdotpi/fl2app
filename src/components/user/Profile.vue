<template>
    <div class="card">
        <form @submit.prevent="updateData">
            <div class="card-header">
                Настройки профиля
            </div>
            <div class="card-body">
                <div class= "row">
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header">
                                Логин и пароль
                            </div>
                            <div class="card-body">
                                <p>Login: {{ this.$auth.user().email }}</p>
                                <button class="btn btn-light" @click.prevent="changePassword" disabled>Сменить пароль</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header">
                                Сведения об организации
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="org_address">Адрес</label>
                                    <input id="org_address" type="text" class="form-control" v-model="organisationInfo.address">
                                </div>
                                <div class="form-group">
                                    <label for="org_inn">ИНН</label>
                                    <input id="org_inn" type="text" class="form-control" v-model="organisationInfo.inn">
                                </div>
                                <div class="form-group">
                                    <label for="org_kpp">КПП</label>
                                    <input id="org_kpp" type="text" class="form-control" v-model="organisationInfo.kpp">
                                </div>
                                <div class="form-group">
                                    <label for="org_name">Наименование</label>
                                    <input id="org_name" type="text" class="form-control" v-model="organisationInfo.name">
                                </div>
                                <div class="form-group">
                                    <label for="org_phone">Телефон</label>
                                    <input id="org_phone" type="text" class="form-control" v-model="organisationInfo.phone">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card">
                            <div class="card-header">
                                Контактные данные
                            </div>
                            <div class="card-body">
                                <div class="form-group">
                                    <label for="profile_name">Имя</label>
                                    <input id="profile_name" type="text" class="form-control" v-model="profile.name">
                                </div>
                                <div class="form-group">
                                    <label for="profile_phone">Телефон</label>
                                    <input id="profile_phone" type="text" class="form-control" v-model="profile.phone">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer ">
                <div class="row">
                    <div class="col">
                        <div class="btn-group float-right" role="group">
                            <button class="btn btn-default">Сохранить</button>
                            <button class="btn btn-danger" @click.prevent="resetData">Отменить</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data () {
        return {
            organisationInfo: {
                address: '',
                inn: '',
                kpp: '',
                name: '',
                phone: ''
            },
            profile: {
                name: '',
                phone: ''
            }
        }
    },

    computed: {
        ...mapGetters(['userData'])
    },

    methods: {
        resetData () {
            this.organisationInfo.address = this.userData.organisationInfo.address
            this.organisationInfo.inn = this.userData.organisationInfo.inn
            this.organisationInfo.kpp = this.userData.organisationInfo.kpp
            this.organisationInfo.name = this.userData.organisationInfo.name
            this.organisationInfo.phone = this.userData.organisationInfo.phone

            this.profile.email = this.userData.profile.email
            this.profile.name = this.userData.profile.name
            this.profile.phone = this.userData.profile.phone
        },

        updateData () {
            let payload = {
                email: this.$auth.user().email,
                data: {
                    organisationInfo: this.organisationInfo,
                    profile: this.profile
                }
            }
            this.$store.dispatch('updateUserData', payload)
        },

        changePassword () {
            alert('Not implemented yet')
        }
    },

    mounted () {
        console.log('reset data')

        this.resetData()
    }
}
</script>
<style>
</style>
