import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
import router from './router'
import axios from 'axios'
import firebase from 'firebase'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCHiHZ4oS-c75tnFaMZBrKsnOumrpEIglA",
  authDomain: "bookstore-1010a.firebaseapp.com",
  projectId: "bookstore-1010a",
  storageBucket: "bookstore-1010a.appspot.com",
  messagingSenderId: "1022586642301",
  appId: "1:1022586642301:web:6ddfb9eb50e63068847614",
  measurementId: "G-3ZPCT2N7K6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  vuetify,
  store,
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
