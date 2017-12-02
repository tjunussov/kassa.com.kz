import Vue from 'vue'
import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyBTZk_x6Md9HWoPufeGPJb5pmN1sDvTCAE",
  authDomain: "kassa-com-kz.firebaseapp.com",
  databaseURL: "https://kassa-com-kz.firebaseio.com",
  projectId: "kassa-com-kz",
  storageBucket: "kassa-com-kz.appspot.com",
  messagingSenderId: "1038445614539"
};

export const $firebase = firebase.initializeApp(config);
export const $fauth = $firebase.auth();
export const $fdb = $firebase.database();

Vue.prototype.$firebase = $firebase;