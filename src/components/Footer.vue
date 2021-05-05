<template>
    <v-footer color="accent" app dark padless src="@/assets/bgImage4.jpg">
    <v-row justify="center" no-gutters>
        <div v-if="uid">
            <v-btn
            id="button"
            v-for="link in linkList"
            :key="link.title"
            :to="link.link"
            text
            rounded
            class="my-2"
            >
            {{ link.title }}
            </v-btn>
        </div>
        <div v-else>
            <v-btn
            id="button"
            v-for="link in linkList"
            :key="link.title"
            :to="link.link"
            text
            rounded
            class="my-2"
            >
            {{ link.title }}
            </v-btn>
        </div>
        <v-col cols="12" class="text-center">
        <h3>FindBooks</h3>
        </v-col>
    </v-row>
    </v-footer>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['uid']),
        linkList(){
            if(this.uid){
                let array = [
                    {title:'Home',link:'/'},
                    {title:'About',link:'/about'},
                    {title:'Favorite',link:'/favorite'},
                    {title:'Profile',link:{name:'Profile', params:{prof_id:this.$store.state.profile.id}}}
                ]
                return array
            }else{
                let array = [
                    {title:'Home',link:'/'},
                    {title:'About',link:'/about'}
                ]
                return array
            }
        }
    }
}
</script>
<style scoped>
h2{
    margin: 0 auto;
}
#button{
    width: 100px;
}
</style>