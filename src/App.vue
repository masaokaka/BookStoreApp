<template>
  <v-app id="all">
    <Header></Header>
    <ToggleMenu/>
    <v-main>
    <Alerts/>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import ToggleMenu from '@/components/ToggleMenu.vue'
import Alerts from '@/components/Alerts.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components:{
    Header,
    Footer,
    ToggleMenu,
    Alerts
  },
  methods:{
    ...mapActions(['setLoginUser','deleteLoginUser','fetchFavorite','fetchProfile'])
  },
  created(){
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.setLoginUser(user);
        this.fetchFavorite();
        this.fetchProfile();
        if(this.$router.currentRoute.name === "Home"){
          this.$router.push({name:'Favorite'},() => {});
        }        
      }else{
        console.log('logout detected')
        this.deleteLoginUser()
        this.$router.push({name:"Home"},()=>{})
      }
    })

  }
}
</script>

<style>
#all{
  background-color: rgb(226, 233, 241);
}
</style>
