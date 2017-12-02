<template lang="pug">
doctype html
b-modal#modalPay(
  visible 
  centered 
  Zsize="sm"
  @hidden="cancel"
  Zhide-footer
  :class="{'shake':status === true}"
  header-text-variant="primary"
  body-text-variant="light"
  footer-text-variant="light"
  no-fade)

  div(slot="modal-title") 
    h3 Оплата

  b-tabs.sm-dark-tabs
    b-tab(
      title="KLIK® <i class='fa fa-cc-visa'></i>" 
      :title-link-class="['bg-primary', 'text-light']")
      b-form-group
        b-input-group(size="lg")
          b-input-group-addon.text-muted
            i.fa.fa-qrcode
          b-form-input(placeholder="Код XXX-XXX" v-model="klik" maxlength="6" size="6" :disabled="status != null")
          //- b-input-group-button
          //-   b-button Оплатить
    b-tab(title="POS Терминал")

  .w-100.text-center(slot="modal-footer")
    b-button.blink(v-if="status === 'PENDING'" block disabled) Производится Оплата
    b-button(v-else-if="status === false" block variant="danger" @click="cancel" ) Оплата Отменена
    b-button(v-else-if="status === true" block variant="success" @click="cancel") Успешная Оплата
    b-button(v-else block variant="primary" size="lg" @click="pay" :disabled="cardAmount == 0 || status === 'READY_TO_SEND'") Оплатить {{cardAmount | money}}  ₸
    
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {$http} from '@/store/api/shop'

export default {
  name: 'modalPay',
  props:['sale'],
  data () {
    return {
      ui: { printer:null,printSecond:true },
      klik: null,
      status:null
    }
  },
  computed:{
    ...mapGetters({
        buyList: 'buyList',
        payList: 'payList',
        no:'saleSeq',
        total: 'buyTotal',
        group: 'getGroupSelected',
    }),
    cardAmount(){
      return this.payList[1].amount
    }
  },
  mounted(){
    this.$root.$emit('bv::show::modal', 'modalPay')
  },
  methods:{
    pay(){
      
      var data = {
        "klik":this.klik, 
        "merchant":this.group.name,
        "amount": this.cardAmount,
      };

      this.status = 'PENDING'
      // console.log(data);
      $http.post('/app/klik',data).then((response)=>{
      // this.$http.post('https://api.klik.kz/invoice',data).then((response)=>{
        var json = response.data
        console.log('klik response',json);
        this.status = json.confirm
        if(json.confirm) { this.payList[1].ui.locked = true }
      }).catch((e)=>{

      })
    },
    done(){
      console.log('done');
      this.$emit('done')
      this.$root.$emit('bv::hide::modal', 'modalPay')
    },
    cancel(){
      console.log('mc cancel');
      this.$emit('hidden')
      this.$root.$emit('bv::hide::modal', 'modalPay')
    }
  }
}


</script>

<style lang="stylus">

  #modalPay 
    .modal-dialog
      background-color transparent

    .modal-content
      background-color rgba(0,0,0,0.6) !important
      padding 4rem
      
    .modal-header, .modal-footer
      border-color rgba(255,255,255,0.1)
      
    .sm-dark-tabs
      .tab-content
        padding-top 2rem
        
      .nav-link.active, .nav-tabs
        border-color #007bff !important
        
      .nav-link:hover
        color: #fff !important
        border-color: rgba(255,255,255,0.1) !important
        

  
</style>
