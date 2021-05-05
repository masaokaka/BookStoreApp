<template>
<v-app-bar app dark src="@/assets/bgImage4.jpg">
    <v-app-bar-nav-icon @click="toggleMenu"></v-app-bar-nav-icon>
    <v-toolbar-title><h1>FindBooks</h1></v-toolbar-title>
    <v-spacer></v-spacer>
    <p v-if="userName">ようこそ  {{userName}}</p>
    <v-btn icon @click="logoutConfirm" v-if="$store.state.login_user">
        <v-icon>mdi-logout</v-icon>
    </v-btn>
    <v-btn icon @click="login" v-else>
        <v-icon>mdi-login</v-icon>
    </v-btn>
</v-app-bar>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['userName'])
    },
    methods:{
        ...mapActions(['toggleMenu','login','logout']),
        logoutConfirm(){
            if(confirm('ログアウトしますか？')){
                this.logout()
            }
        }
    }
}
</script>

<style scoped>
p{
    margin-top: 18px;
}
</style>