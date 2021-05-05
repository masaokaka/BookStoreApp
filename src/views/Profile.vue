<template>
<v-container>
  <v-layout row rap justify-center>
    <v-flex xs12 class="text-center">
      <h2>あなたのプロフィール</h2>
    </v-flex>
    <v-card elevation="4" width="500px">
      <v-card-text>
          <v-form>
              <v-text-field v-model="profile.name" label="名前"></v-text-field>
              <v-select :items="select" v-model="profile.gender" label="性別"></v-select>
              <v-text-field v-model="profile.email" label="メールアドレス"></v-text-field>
              <v-text-field v-model="profile.nickName" label="ニックネーム"></v-text-field>
              <v-text-field v-model="profile.address" label="都道府県"></v-text-field>
              <div class="text-center">
                <v-btn @click="$router.push({name:'Home'})">キャンセル</v-btn>
                <v-btn color="info" class="ml-2" @click="submit()">保存</v-btn>
              </div>
          </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</v-container>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'About',
  data(){
    return{
      profile:{},
      select:[
        '男性',
        '女性',
        'その他'
      ],
    }
  },
  // 再描画されても登録はできるので、このままでいい。
  created(){
    this.profile = this.$store.state.profile
  },
  methods:{
    ...mapActions(['addProfile','updateProfile','alertChange']),
    submit(){
      if(this.$route.params.prof_id){
        this.updateProfile({
          id:this.$route.params.prof_id,
          profile:this.profile
        }).then(res=>{
          if(res===true){
            this.alertChange({type:'info',text:'プロフィールを更新しました。'});
          }else if(res===false){
            this.alertChange({type:'error',text:'プロフィールが更新できませんでした。'});
          }
        })
      }else{
        this.addProfile(this.profile).then(res=>{
          if(res===true){
            this.alertChange({type:'info',text:'プロフィールを更新しました。'});
          }else if(res===false){
            this.alertChange({type:'error',text:'プロフィールが更新できませんでした。'});
          }
        })
      }
    }
  }
}
</script>
<style scoped>
h2{
  margin-top:20px;
}
</style>