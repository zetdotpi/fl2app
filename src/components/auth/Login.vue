<template>
    <div class="row">
        <form class="form-signin">
            <h2 class="form-signin-heading">Sign in please</h2>
            <label for="inputEmail" class="sr-only">Email</label>
            <input type="text" class="form-control" v-model="username">
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" class="form-control" v-model="password">
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="rememberMe"> Remember me
                </label>
            </div>
            <button class="btn btn-primary btn-block" @click.prevent="login">Sign in</button>
        </form>
    </div>
</template>
<script>
export default {
    data () {
        return {
            username: '',
            password: '',
            rememberMe: true
        }
    },
    methods: {
        login () {
            this.$auth.login({
                data: {
                    username: this.username,
                    password: this.password
                },
                rememberMe: this.rememberMe
            })
                .then(res => {
                    this.$store.dispatch('initStores')
                    console.log('whoa!')
                })
        }
        // login(this.$auth.login())
    },
    mounted () {
        if (this.$auth.check()) {
            this.$router.push({name: 'home'})
        }
    }
}
</script>
<style scoped>
.form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
    margin-bottom: 10px;
}
.form-signin .checkbox {
    font-weight: 400;
}
.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-signin .form-control:focus {
    z-index: 2;
}
.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
