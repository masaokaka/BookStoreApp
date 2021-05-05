<template>
  <v-container id="container">
    <v-layout row rap justify-center>
      <v-flex xs12 class="text-center">
        <h2>書籍検索</h2>
      </v-flex>
    <SearchForm @update:items = "search"/>
    </v-layout>
    <v-layout row rap justify-center>
      <v-flex xs12 class="text-center">
        <h2>書籍一覧</h2>
      </v-flex>
        <v-card id="items" v-for="(item,index) in items" :key="index" outlined>
          <!-- 画像 -->
          <div id="img">
            <v-img :src="item.largeImageUrl" alt="画像"></v-img>
          </div>
          <!-- タイトルなど -->
          <div id="contents">
            <v-card-title>{{item.title}}</v-card-title>
            <v-card-subtitle>{{item.author}}</v-card-subtitle>
            <v-divider></v-divider>
            <v-card-text>
              <div>Score: 
                <span v-if="4.0 <= Math.floor(item.reviewAverage*10)/10" class="itemScore1">{{item.reviewAverage}}</span>
                <span v-else-if="3.5 <= Math.floor(item.reviewAverage*10)/10" class="itemScore2">{{item.reviewAverage}}</span>
                <span v-else class="itemScore3">{{item.reviewAverage}}</span>
              </div>
              <div>{{item.itemCaption}}</div>
            </v-card-text>
          </div>
          <!-- 金額とボタン -->
          <div id="buttons">
            <div class="itemPrice">{{item.itemPrice}}円</div>
            <v-card-actions class="itemButtons">
              <v-btn color="accent" :href="item.itemUrl">購入</v-btn>
              <v-btn v-if="$store.state.login_user" @click="fav(item)" color="orange"><v-icon color="white">mdi-star</v-icon></v-btn>
            </v-card-actions>
          </div>
        </v-card>
    </v-layout>
    <!-- ページネーション -->
    <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="10"
              @input="getPage"
              color="accent"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
  </v-container>
</template>

<script>
import {mapActions} from 'vuex'
import SearchForm from '@/components/SearchForm.vue'
export default {
  name: 'Home',
  components: {
    SearchForm
  },
  data(){
    return{
      items:[],
      page:1,
      text:null,
      sorts:'standard'
    }
  },
  created(){
    const text = this.text;
    const sorts = this.sorts
    const pageNow = this.page;
    this.getApi({text,sorts,pageNow});
    this.items = this.$store.state.items
  },
  methods:{
    ...mapActions(['getApi','addFavorite','alertChange']),
    getPage(){
      const text = this.text;
      const sorts = this.sorts;
      const pageNow = this.page;
      this.getApi({text,sorts,pageNow});
      this.items = this.$store.state.items;
    },
    search(...args){
      const [text,sorts] = args;
      const pageNow = this.page;
      this.getApi({text,sorts,pageNow});
      this.text = text;
      this.sorts = sorts;
      this.items = this.$store.state.items;
    },
    fav(favorite){
        this.addFavorite(favorite).then((res)=>{
          if(res===true){
            this.alertChange({type:'success',text:'登録しました。'});
          }else if(res===false){
            this.alertChange({type:'error',text:'すでに登録があります。'});
          }
        })
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
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
.itemPrice{
  font-weight: bold;
  font-size: 20px;
  text-align: right;
}
.itemScore1{
  font-weight: bold;
  margin-top: 5px;
  font-size: 20px;
  color: red;
}
.itemScore2{
  font-weight: bold;
  margin-top: 5px;
  font-size: 20px;
  color: orange;
}
.itemScore3{
  font-weight: bold;
  margin-top: 5px;
  font-size: 15px;
}
</style>
