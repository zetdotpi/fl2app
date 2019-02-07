<template>
    <div class="row justify-content-center">
        <form v-if="showForm" class="col-sm-12 col-md-6 col-6" @submit.prevent="completeRegistration">
            <br>

            <div v-if="serverError" class="row alert alert-danger" role="alert">
                Произошла ошибка при регистрации. Свяжитесь с техподдержкой<a href="mailto:webmaster@feedlikes.ru"> по электронной почте</a>
            </div>

            <div class="form-group">
                <label for="reg_token">Код регистрации</label>
                <input id="reg_token" type="text" class="form-control" v-model="regToken" disabled>
            </div>
            <div class="form-group">
                <label for="acc_pass">Пароль</label>
                <input
                    id="acc_pass"
                    type="password"
                    :class="{ 'form-control': true, 'is-invalid': weakPassword, 'is-valid': !weakPassword }"
                    v-model="password"
                    @input="validatePassword">
                <div class="invalid-feedback">Пароль должен быть длиной 6 или более символов</div>
            </div>

            <h3>Сведения об организации</h3>
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

            <h3>Контактные данные</h3>
            <div class="form-group">
                <label for="profile_name">Имя</label>
                <input
                    id="profile_name"
                    type="text"
                    :class="{ 'form-control': true, 'is-invalid': noName, 'is-valid': !noName }"
                    v-model="profile.name"
                    @input="validateName">
                <div class="invalid-feedback">Необходимо ввести имя</div>
            </div>
            <div class="form-group">
                <label for="profile_phone">Телефон</label>
                <input
                    id="profile_phone"
                    type="text"
                    :class="{ 'form-control': true, 'is-invalid': noPhone, 'is-valid': !noPhone }"
                    v-model="profile.phone"
                    @input="validatePhone">
                <div class="invalid-feedback">Необходимо ввести телефон</div>
            </div>
            <button
                class="btn btn-default"
                :disabled="weakPassword || noPhone || noName">Завершить регистрацию</button>
        </form>
        <p v-if="!showForm">Для завершения регистрации необходим токен. Ссылка находится в письме в ваших входящих письмах.</p>
    </div>
</template>
<script>
import Vue from 'vue'

export default {
    data () {
        return {
            serverError: false,
            showForm: false,
            regToken: '',
            password: '',
            weakPassword: true,
            noPhone: true,
            noName: true,

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

    methods: {
        validatePassword () {
            if (this.password.length < 6) {
                this.weakPassword = true
            } else {
                this.weakPassword = false
            }
        },

        validatePhone () {
            if (this.profile.phone.match(/^\+?\d{6,}$/) === null) {
                this.noPhone = true
            } else {
                this.noPhone = false
            }
        },

        validateName () {
            if (this.profile.name === '') {
                this.noName = true
            } else {
                this.noName = false
            }
        },

        completeRegistration () {
            this.serverError = false
            if (this.weakPassword || this.noPhone || this.noName) {
                return 0
            }

            let payload = {
                regToken: this.regToken,
                password: this.password,
                organisationInfo: this.organisationInfo,
                profile: this.profile
            }

            console.log(payload)

            Vue.axios.post('/auth/register/profile', payload)
                .then(response => {
                    Vue.router.push({name: 'registrationCompleted'})
                })
                .catch(error => {
                    console.log(error)
                    this.serverError = true
                })
        }
    },

    mounted () {
        if (this.$auth.check()) {
            this.$router.push({name: 'home'})
        }

        this.regToken = this.$route.query.reg_token
        if (this.regToken == null) {
            this.showForm = false
        } else {
            this.showForm = true
        }
    }
}
</script>
<style>
</style>
