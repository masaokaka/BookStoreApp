<template>
<v-container id="container">
  <v-layout row rap justify-center>
    <v-flex xs12 class="text-center">
      <h2>お気に入り書籍一覧</h2>
    </v-flex>
    <v-card id="items" v-for="(item,index) in items" :key="index">
      <!-- 画像 -->
      <div id="img">
        <v-img :src="item.largeImageUrl" alt="画像" width="150" height="200"></v-img>
      </div>
      <div id="contents">
        <v-card-title>{{item.title}}</v-card-title>
        <v-card-subtitle>{{item.author}}</v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <div>Score: 
            <span class="itemScore1">{{item.reviewAverage}}</span>
          </div>
          <div>{{item.itemCaption}}</div>
        </v-card-text>
      </div>
      <div>
        <div class="itemPrice">{{item.itemPrice}}円</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="accent" :href="item.itemUrl">購入はこちら</v-btn>
          <v-btn color="orange" @click="deleteFav(item.id)"><v-icon color="white">mdi-star-off</v-icon></v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Favorite',
  components: {
  },
  data(){
      return {
          items:[]
      }
  },
  created(){
      this.items = this.$store.state.favs;
  },
  methods:{
    deleteFav(id){
      this.deleteFavorite(id).then((res)=>{
        if(res===true){
          this.alertChange({type:'success',text:'削除しました。'});
        }
      })
    },
    ...mapActions(['deleteFavorite','alertChange'])
  }
}
</script>

<style>
h2{
  margin-top: 20px;
}
#items{
  display: flex;
  padding: 10px;
}
#img{
  width:150px;
  height:220px;
}
#contents{
  width: 600px;
}
#buttons{
  width: 150px;
}
a{
  text-decoration: none;
}
.itemPrice{
  font-weight: bold;
  margin-top: 10px;
  font-size: 20px;
  text-align: right;
}
.itemScore1{
  font-weight: bold;
  margin-top: 5px;
  font-size: 20px;
}
</style>