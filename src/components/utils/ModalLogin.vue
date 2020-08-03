<template lang="pug">
doctype html
b-modal#modalLogin(
  :visible="value!==false"
  size="sm"
  title="Вход"
  :class="{'isModalError':ui.isLoginError}"
  header-bg-variant="light"
  @hidden="cancel"
  lazy
  no-fade)

  b-alert(v-if="ui.isLoginError" variant="danger" show) {{ui.isLoginError}}

  b-tabs(no-fade v-model="ui.tab")
    b-tab(title="Список")
      b-list-group.mt-3(v-if="group")
        b-list-group-item.d-flex.justify-content-between.align-items-center(
          @click="v.pin? ui.tab = 1 : login({key:k,val:v})" v-for="(v, k, index) in group.security.users"
          :key="k")
          span
            i.fa.mr-1(:class="{'fa-user': v.role == null, 'fa-graduation-cap': v.role == 'admin' }")/
            | {{k}}
          i.fa.fa-lock(v-if="v.pin")/
    b-tab(title="Пинпад")
      pinpad.px-2.pt-3(v-model="pin" @enter="loginWithPin")

  .w-100(slot="modal-footer")
    b-form-group
      b-input-group
        b-input-group-addon: i.fa.fa-th(@click="ui.tab = 1")/
        b-form-input(type="password" v-model="pin" placeholder="ПИН..." maxlength="4" @keyup.enter="loginWithPin")
    b-button(variant="primary" :disabled="!pin" block @click="loginWithPin") Войти

</template>

<script>
import pinpad from './PinPad'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'modalLogin',
  props: ['value'],
  data () {
    return {
      ui: { tab:0, isLoginError:false, tm:null },
      pin: null
    }
  },
  watch:{
    value(val){
      if(val && val.pin) this.ui.tab = 1
      else  {
        this.ui.tab = 0 // reseting tab to first
        this.pin = null
      }
    }
  },
  computed:{
    ...mapGetters({
        group: 'getGroupSelected',
    }),
  },
  components:{
    pinpad
  },
  methods:{
    ...mapActions([
      'switchUser',
    ]),
    login(p){
      this.switchUser(p).then(()=>{
        this.done()
      })
    },
    loginWithPin(){
      this.switchUser({pin:this.pin}).then(()=>{
        this.done()
      }).catch((e)=>{
        console.log('Ctached',e);
        this.error(e)
      })
    },
    error(e){
      this.ui.isLoginError = e
      clearTimeout(this.ui.tm)
      this.ui.tm = setTimeout(()=>{
        this.ui.isLoginError = false
      },5000)
    },
    done(){
      console.log('done');
      this.$emit('input',false)
      // this.$root.$emit('bv::hide::modal', 'modalLogin')
    },
    cancel(){
      console.log('mc cancel');
      this.$emit('input',false)
    }
  }
}
</script>

<style scoped lang="stylus">


</style>
