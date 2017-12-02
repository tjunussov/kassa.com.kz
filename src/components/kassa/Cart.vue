<template lang="pug">
doctype html
div(@click.prevent.stop="()=>{}")
  b-card.h-100(no-body)
    b-card-header.card-modal-header#saleSearch
      .form-control.fake(v-if="notEmptyCart") 
        h5 Чек {{'#'+no}} 
      CheckSearchPopup(v-if="!notEmptyCart")
      button.close(@click="cancel" v-show="notEmptyCart") ×
    b-collapse#client(:visible="notEmptyCart")
      b-card-header.no-padding
        b-list-group(flush)
          b-list-group-item.check-client
            b-form-input-autocomplete(
              v-model="payerContact"
              target="contactAutocomplete"
              @select="(v,c)=>{ c(v) }"
              @filter="(v,c)=>{ c({'code_':v}) }"
              store="contacts")
              b-input-group.flat
                b-input-group-addon
                  i.fa.fa-id-card-o
                b-form-input-contact#contactAutocomplete(v-model="payerContact" placeholder="Клиент...")
              .text-center.text-muted.m-2(slot="no-result") Введите имя/номер клиента ...
              .d-flex.w-100.justify-content-between(slot="result-list" slot-scope="props")
                span.mr-2 {{props.item.name}}
                b {{props.item.code_ | tel}}

    b-card-body.scroll-y.p-2
      b-list-group
        CartItem(v-for="(l, index) of buyList" :item="l" :i="index" :key="l.name" to="/kassa/items/product" @delete="deleteItem")
        b-list-group-item.text-muted.more(@click="$emit('addBlank')" href="#")
          i.fa.fa-plus.mr-2/ Добавить ... 

    b-collapse#payment(:visible="notEmptyCart")
      b-card-header(@click="$router.push({name:'Tender'})").Zshow-onhover
        b-btn.float-right.mixPay(@click.stop="expandPayment" variant="link"): i.fa(:class="{'fa-chevron-up':ui.mixPay,'fa-chevron-down':!ui.mixPay}")
        template(v-if="excess==0") {{ui.mixPay?'Смешанная ':''}} Оплата
        span(v-else :class="{'text-danger':excess < 0,'text-primary':excess > 0}") {{excess &gt; 0?'Сдача':'Недоимка'}} {{excess | money}} ₸
      b-card-footer.scroll-y.no-padding
        
        b-list-group(flush)
          CartItem(v-if="payList && payList[0]" :item="payList[0]" :i="0" :key="payList[0].name" to="/kassa/tender/cash" @delete="deletePaymentItem")
            
          b-collapse#payCash(v-model="ui.mixPay")

            CartItem(v-if="index > 0" v-for="(l, index) of payList" :item="l" :i="index" :key="l.name" to="/kassa/tender/cash" @iconClick="ui.showModalPay=true" @delete="deletePaymentItem")

            b-list-group-item.text-muted.more(@click="$emit('addBlankPayment')" href="#")
              i.fa.fa-plus.mr-2/ Добавить ...

    b-card-footer.text-center.text-light.no-padding
      b-dropdown.total-button.btn-block#buttonTender(size="lg" :disabled="buttonTenderEnabled" variant="primary" right split dropup  @click="tender")
        template(slot="button-content") 
          h5 Продажа 
            AnimatedNumber(:number="total") 
            |  ₸
        b-dropdown-header Операции
        b-dropdown-item(href="#" active) Продажа
        b-dropdown-item(href="#") Покупка
        b-dropdown-item(href="#") Возврат
        b-dropdown-divider
        b-dropdown-item(href="#") Draft
        b-dropdown-item(href="#") Заказ
        b-dropdown-item(href="#") Бронь
        b-dropdown-divider
        b-dropdown-item(href="#") Предоплата
        b-dropdown-item(href="#") Пречек
        b-dropdown-item(href="#") Инвойс
        //- b-dropdown-header Наличные
        b-dropdown-divider
        b-dropdown-item(href="#") Внесение
        b-dropdown-item(href="#") Изъятие
        b-dropdown-item(href="#") Инкасация
        b-dropdown-divider
        b-dropdown-item(href="#" disabled) Перемещение
        b-dropdown-item(href="#" disabled) Списание
        b-dropdown-item(href="#" disabled) Бартер

  ModalCheck(v-if="ui.showModalCheck" @hidden="cancel" @done="cancel" :sale="receipt")
  ModalPay(v-if="ui.showModalPay" @hidden="ui.showModalPay = false" :sale="receipt")

  b-tooltip(v-if="buttonTenderEnabled" target="buttonTender" title="Нужно Авторизоваться")
  
</template>

<script>
import ModalCheck from '@/components/kassa/check/ModalCheck'
import ModalPay from '@/components/kassa/check/ModalPay'

import CheckSearchPopup from '@/components/kassa/search/CheckSearchPopup'
import CartItem from '@/components/kassa/CartItem'
import CartClientItem from '@/components/kassa/CartClientItem'
import AnimatedNumber from '@/misc/AnimatedNumber'
import ContactInput from '@/components/contacts/ContactInput'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  data () {
    return {
      ui: { mixPay:false,showModalCheck:false,showModalPay:false },
      sale:null
    }
  },
  mounted(){    
    this.$bus.$on('keyboard:keyup:esc',this.cancel);
  },
  beforeDestroy(){
    this.$bus.$off('keyboard:keyup:esc',this.cancel);
  },
  computed:{
    ...mapGetters({
        group: 'getGroupSelected',
        buyList: 'buyList',
        payList: 'payList',
        no:'saleSeq',
        total: 'buyTotal',
        payTotal: 'payTotal',
        excess: 'excess',
        buyerContact: 'buyerContact',
        receipt: 'getReceipt',
        currentUserKey: 'currentUserKey',
    }),
    buttonTenderEnabled(){
      return !(this.notEmptyCart && ( this.currentUserKey || this.group.security.anonymousLogin ) )
    },
    payerContact: {
      get () {
        // console.log(this.$store.state);
        return this.$store.state.cart.payerContact
      },
      set (value) {
        this.setPayerContact(value)
      }
    },
    notEmptyCart(){
      return this.buyList.length > 0
    }
  },
  components:{
    CartItem,
    ModalCheck,
    CartClientItem,
    CheckSearchPopup,
    ModalPay,
    AnimatedNumber,
    'b-form-input-contact':ContactInput
  },
  methods:{
    ...mapActions([
      'initCart',
      'checkout',
      'contactsSelect',
      'contactsSetFilter',
      'addToCart',
      'removeFromCart',
      'addPaymentToCart',
      'removePaymentFromCart',
      'setPayerContact',
      'resetCart'
    ]),
    add(item){
      this.addToCart(item)
    },
    addPayment(item){
      this.addPaymentToCart(item)
    },
    deleteItem(item){
      console.log('Deleting',item);
      this.removeFromCart(item)
    },
    deletePaymentItem(item){
      console.log('Deleting',item);
      this.removePaymentFromCart(item)
    },
    expandPayment(){
      this.ui.mixPay=!this.ui.mixPay
      if(this.ui.mixPay){
        // Изза collapse пришлось сделать тайммаут, и затем фокусировка
        window.setTimeout(()=>{
          // console.log(this.$('#payment .paymentInput1'));
          this.$('#payment .paymentInput1').focus() 
        }, 100)
      }
    },
    cancel(){
      console.log('ClearAll');
      // this.$resetData();
      this.ui.mixPay = false
      this.ui.showModalCheck = false
      this.contactsSelect(null)
      this.contactsSetFilter(null)
      this.resetCart()
      this.$router.push('/kassa/menu')
    },
    tender(){
      // console.log('Tender');
      this.checkout().then((sale)=>{
        // console.log('tender',sale);
        this.ui.showModalCheck = true
        // this.sale = sale
      })
    }
  }
}
</script>

<style scoped lang="stylus">

      
.list-group-item
  
  &.active, &.changed
    background-color rgba(0,123,255,0.2)
    color rgba(0,123,255,1)
      
  &.changed
    -webkit-animation: minishake .3s linear;
          
/****************************/
  
.check-client
  background-color rgba(255,255,170,.5) !important
  color #636356
  
.check-client.list-group-item.active
  background-color #ffa !important
  color #636356
  
  
</style>

