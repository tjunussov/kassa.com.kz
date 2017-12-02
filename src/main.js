// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import AxiosVue from './services/axios'

import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'nprogress/nprogress.css'

import '@/misc/filters'
import '@/misc/directives'
import '@/misc/utils'
import '@/services/EventBus'
// import '@/services/Websocket'
// import '@/services/KassaService'

// Mocking Service
import '@/store/api/mock'

sync(store, router)

Vue.use(BootstrapVue)
Vue.use(AxiosVue)

Vue.config.productionTip = false

import Tel from '@/components/contacts/Tel'
import AutoComplete from '@/misc/AutoComplete'

Vue.component('tel', Tel)
Vue.component('b-form-input-autocomplete', AutoComplete)

// import * as vue from 'vue'

// Global Functions
Vue.mixin({
  methods: {
    $resetData: function (emit) {
      console.log('reset global data =', this.$options.name)
      // reset data()
      Object.assign(this.$data, this.$options.data.call(this));
      if((emit !==null && emit) || ( emit == null)) this.$emit('reset',null) /// CAUTION! May Interefere with other local events
    },
    $_clone: function (val) {
      return Object.assign({},val);
    },
    $: function (id) {
      return document.querySelector(id)
    },
    $ArrayRemoveElement(arr,item){
      let index = arr.indexOf(item);
      if(index !== -1) {
        arr.splice(index, 1);
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      online:false,
    }
  },
  created(){
    window.addEventListener('keyup',this.documentKeyup)
    window.addEventListener("online",this.checkOnline);
    window.addEventListener("offline",this.checkOnline);
    document.addEventListener('click',this.documentClick)
    this.checkOnline()
    // this.handleScroll = new InfiniteList(this.$refs.infinite, 'contacts', this.$store)
  },
  beforeDestroy(){
    window.removeEventListener('keyup',this.documentKeyup)
    window.removeEventListener("online",this.checkOnline);
    window.removeEventListener("offline",this.checkOnline);
    document.removeEventListener('click',this.documentClick)
  },
  mounted(){
  },
  router,
  store,
  methods:{
    checkOnline(){
      console.log('check online',navigator.onLine);
      this.online = navigator.onLine
    },
    documentKeyup(){
      if (event.keyCode == 27) { // ESC
        this.$bus.$emit('keyboard:keyup:esc');
      }
    },
    documentClick(){
      this.$bus.$emit('mouse:click');
    }
  },
  render: h => h(App)
})

/*
var old = console.log;
console.log = function(){
  Array.prototype.unshift.call(arguments, 'Vue: ');
  old.apply(this, arguments)
}*/