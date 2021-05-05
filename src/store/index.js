import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toggleMenu:false,
    myApplicationId:'1071922701371551110',
    items:[],
    favs:[],
    profile:{},
    login_user:null,
    alerts:{
      type:'',
      text:''
    }
  },
  getters:{
    uid:state=>state.login_user?state.login_user.uid:null,
    photoURL: state => state.login_user ? state.login_user.photoURL:'',
    userName: state => state.login_user ? state.login_user.displayName:''
  },

  mutations: {
    toggleMenu(state){
      state.toggleMenu = !state.toggleMenu;
    },
    getApi(state,items){
      state.items = items;
    },
    setLoginUser(state,user){
      state.login_user = user
    },
    deleteLoginUser(state){
      state.login_user = null
      state.favs = []
    },
    addFavorite(state,{id,favorite}){
      favorite.id = id
      state.favs.push(favorite)
    },
    deleteFavorite(state,id){
      const index = state.favs.findIndex((fav)=>fav.id === id);
      state.favs.splice(index,1);
      // state.favs = state.favs.filter((fav)=>fav.id!==id)
    },
    addProfile(state,{id,profile}){
      profile.id = id
      state.profile = profile
    },
    alertChange(state,{type,text}){
      console.log(state.alerts)
      state.alerts = {type,text}
      console.log(state.alerts)
    }
  },


  actions: {
    toggleMenu({commit}){
      commit('toggleMenu');
    },
    getApi({state,commit},value){
      let text = value.text;
      let sorts = value.sorts;
      let pageNow = value.pageNow;
      let items =[];
      axios.get('https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404',
      {
        params: {
          applicationId: state.myApplicationId,
          title:text,
          sort:sorts,
          hits:10,
          page:pageNow,
          formatVersion: 2
        }
      })
      .then(res=>{
        res.data.Items.forEach(item=>{
          items.push(item)
        })
      })
      commit('getApi',items);
    },
    addFavorite({state,getters,commit},favorite){
      if(getters.uid){
        let flag = true;
        state.favs.forEach(fav=>{
          // 重複があった場合フラッグをfalseに(isbnコードで判別)
          if(fav.isbn===favorite.isbn){
            flag = false;
          }
        });
        if(flag===true){
          firebase.firestore().collection(`users/${getters.uid}/favorite`).add(favorite).then((doc)=>{
            commit("addFavorite",{id:doc.id,favorite})
          })
          return true
        }else if(flag===false){
          return false
        }
      }
    },
    login(){
      //Googleプロバイダのインスタンスを作成する
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      //firebaseのログインをセッションの続く限り保持するように変更。（デフォルトは永続的）
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
      //Googleのログインページにリダイレクトしてログインする
      firebase.auth().signInWithRedirect(google_auth_provider);
      })
    },
    logout(){
      firebase.auth().signOut()
    },
    setLoginUser({commit},user){
      commit('setLoginUser',user)
    },
    deleteLoginUser({commit}){
      commit('deleteLoginUser')
    },
    fetchFavorite({getters,commit}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/favorite`).get()
        .then(snapShot=>{
          snapShot.forEach(doc=>{
            commit('addFavorite',{id:doc.id,favorite:doc.data()})
          })
        })
      }
    },
    deleteFavorite({getters,commit},id){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/favorite`).doc(id).delete().then(()=>{
          commit('deleteFavorite',id)
        })
        return true
      }
    },
    addProfile({getters,commit},profile){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/profile`).add(profile).then((doc)=>{
          commit('addProfile',{id:doc.id,profile})
        })
        return true
      }
    },
    fetchProfile({getters,commit}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/profile`).get().then(snapShot=>{
          snapShot.forEach(doc=>{
            commit('addProfile',{id:doc.id,profile:doc.data()})
          })
        })
      }
    },
    updateProfile({getters,commit},{id,profile}){
      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/profile`).doc(id).update(profile).then(()=>{
          commit('addProfile',{id,profile})
        })
        return true
      }
    
    },
    alertChange({dispatch,getters,commit},{type,text}){
      if(getters.uid){
        commit('alertChange',{type,text})
        dispatch('alertDefault')
      }
    },
    alertDefault({commit}){
      setTimeout(()=>{commit('alertChange',{type:'',text:''})},5000)
    }
  },
  modules: {
  
  }
})
