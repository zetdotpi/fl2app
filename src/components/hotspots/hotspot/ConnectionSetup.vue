<template>
    <div class="col">
        <div class="row">
            <h1>Connection setup for {{ hotspot.name }}</h1>
        </div>
        <div class="row">
            <p>Please login to your router using winbox, open "New Terminal" and enter (or paste) following commands:</p>
            <div class="card">
                <div class="card-body">
                    <pre><code id="vpnSetupCode">/interface ovpn-client add name=FeedLikesVPN connect-to=vpn.feedlikes.ru user={{hotspot.vpnUser.username}} password={{hotspot.vpnUser.password}} port=1194 cipher=null add-default-route=no
/ip service enable api
/ip service set numbers=api port=8728
/ip firewall filter add chain=input protocol=tcp dst-port=8728 action=accept place-before=1
</code></pre>
                    <button class="btn btn-default" @click="copyToClipboard">Copy to clipboard</button>
                </div>
            </div>
            <p>Please be patient. Connection setup can take a while.</p>
        </div>
        <div class="row justify-content-center">
            <form class="col-md-4">
                <div class="form-group">
                    <label for="username">Username:</label>
                    <input type="text" name="username" class="form-control" v-model="username">
                    <small class="form-text">
                    Router user name with admin rights. We do not store this username and password and will not use them after hotspot connection procedure is complete.
                    </small>
                </div>
                <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" name="password" class="form-control" v-model="password">
                </div>
                <button class="btn btn-info" @click.prevent="connect">Continue setup</button>
            </form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            username: '',
            password: ''
        }
    },
    computed: {
        hotspot () {
            return this.$store.getters.hotspot(this.$route.params.id)
        }
    },
    methods: {
        copyToClipboard () {
            let text = document.getElementById('vpnSetupCode').innerText
            let ta = document.createElement('textarea')
            ta.value = text
            ta.style.csstext = 'position:fixed;pointer-events:none;z-index:-9999;opacity:0;'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        },
        connect () {
            let data = {
                identity: this.hotspot.identity,
                credentials: {
                    username: this.username,
                    password: this.password
                }
            }
            this.$store.dispatch('setupHotspotConnection', data)
        }
    }
}
</script>
<style>
</style>
