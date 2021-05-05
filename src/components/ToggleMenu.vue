<template>
    <v-navigation-drawer v-model="$store.state.toggleMenu" app clipped temporary>
        <v-list>
            <v-list-item>
                <v-list-item-avatar>
                    <img v-if="photoURL" :src="photoURL">
                </v-list-item-avatar>
                <v-list-item-content v-if="userName">
                    <v-list-item-title>{{userName}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            
            <!-- アイテムアイコン -->
            <div v-if="uid">
            <v-list-item v-for="item,index in linkList" :key="index" :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>                
            </div>
            <div v-else>
            <v-list-item v-for="item,index in linkList" :key="index" :to="item.link">
                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                    </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{item.name}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            </div>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            items:[
                {name:'Home',icon:'mdi-home',link:'/'},
                {name:'About',icon:'mdi-plus',link:'/about'},
            ],
        }
    },
    computed:{
        ...mapGetters(['photoURL','userName','uid']),
        linkList(){
            if(this.uid){
                let array = [
                    {name:'Home',icon:'mdi-home',link:'/'},
                    {name:'About',icon:'mdi-plus',link:'/about'},
                    {name:'Profile',icon:'mdi-face',link:{name:'Profile', params:{prof_id:this.$store.state.profile.id}} }, 
                    {name:'Favorite',icon:'mdi-star',link:'/favorite'},
                ]
                return array
            }else{
                let array = [
                    {name:'Home',icon:'mdi-home',link:'/'},
                    {name:'About',icon:'mdi-plus',link:'/about'},
                ]
                return array
            }
        }
    }
}
</script>