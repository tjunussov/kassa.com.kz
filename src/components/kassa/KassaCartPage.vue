<template lang="pug">
doctype html
.kassa.Ztabbed.mb-4.h-100  
  b-card.d-flex.h-100.flex-column(no-body @click.prevent.stop="select")
    div(slot="header")
      b-row
        b-col(sm="8")
          b-row
            b-col(sm="8")
              b-input-group
                b-input-group-addon(v-b-modal.modalLibrary)
                  .fa.fa-briefcase
                b-form-input#itemsSearch(
                  v-model="item.name" 
                  size="lg" 
                  type="text" 
                  placeholder="Наименование товара ..." 
                  @keyup.native="itemsSetFilter({ name: $event.target.value })")
                ItemSearchPopup
            
            b-col(sm="4")
              b-input-group
                b-input-group-addon(v-b-toggle.collapseExtra)
                  .fa.fa-angle-down
                b-form-input.text-right(@keyup.enter.native="addToBasketRaw(item)" v-model.number="item.amount" size="lg" placeholder="0 ₸" autofocus)
        b-col(sm="4").card-modal-header#saleSearch
          h5(v-if="notEmptyCart") Чек {{'#'+no}} 
            CheckSearchPopup(v-if="!notEmptyCart")
            button.close(@click="cancel") ×
      b-collapse.mt-2#collapseExtra
        b-row
          b-col(sm="8")
            b-input-group
              b-input-group-addon
                .fa.fa-inbox
              b-form-input(v-model="item.quantity" type="number" placeholder="Кол-во" autofocus)
              b-input-group-addon
                .fa.fa-percent
              b-form-input.text-right(v-model="item.discount" type="number" placeholder="Скидка 0%" autofocus)
          b-col(sm="4")
            b-form-input.text-right(v-model="item.price" type="number" placeholder="Цена" autofocus)
    b-card-body.scroll-y
      b-row
        b-col(sm="8")
          router-view(@addToBasket="addToBasket" @calculator="calculator")
        b-col(sm="4")
          b-card(no-body)
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

            b-card-body.scroll-y.no-padding
              b-list-group(flush)
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
    b-card-footer
      b-nav.fliped(Zfill tabs)
        b-nav-item(to="/kassa/menu") Меню
        b-nav-item(to="/kassa/calc") Калькулятор
        b-nav-item(to="/kassa/items") Каталог
        //- b-nav-item(to="/kassa/tender") Расчеты
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ItemSearchPopup from '@/components/kassa/search/ItemSearchPopup'


import ModalCheck from '@/components/kassa/check/ModalCheck'
import ModalPay from '@/components/kassa/check/ModalPay'

import CheckSearchPopup from '@/components/kassa/search/CheckSearchPopup'
import CartItem from '@/components/kassa/CartItem'
import CartClientItem from '@/components/kassa/CartClientItem'
import AnimatedNumber from '@/misc/AnimatedNumber'
import ContactInput from '@/components/contacts/ContactInput'

export default {
  name: 'kassa',
  data () {
    return {
      ui:{routeLeave:false, mixPay:false,showModalCheck:false,showModalPay:false },
      sale:null,
      item:{
        name:null,
        amount:null,
        discount:0,
        type_:"product",
        quantity:1,
        price:null,
        ui:{ disabled: false, manualEnter:true }
      }
    }
  },
  computed: {
    ...mapGetters({
        selected: 'getItemsSelected', 
        items: 'getItems',
        page: 'getItemsPage', 
        nbPages: 'getItemsNbPages', 
        count: 'getItemsCount',
        limit: 'getItemsLimit',
        thinking: 'getItemsThinking', 
        infinite: 'getItemsInfinite',
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
  mounted(){
    this.$bus.$on('mouse:click',this.cancel);
  },
  beforeDestroy(){
    this.$bus.$off('mouse:click',this.cancel);
  },
  components:{
    ItemSearchPopup,
    CartItem,
    ModalCheck,
    CartClientItem,
    CheckSearchPopup,
    ModalPay,
    AnimatedNumber,
    'b-form-input-contact':ContactInput
  },
  beforeRouteLeave (to, from, next) {
    this.ui.routeLeave = true
    next()
  },
  methods:{
    ...mapActions([
      'itemsSelect',
      'itemsAdd',
      'itemsRemove',
      'itemsUpdate',
      'itemsSetFilter',
      'itemsSetLimit',
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
    calculator(v){
      if(v == "enter"){
        this.addToBasket(this.item)
      } else if(v){
        this.item.amount = (this.item.amount?this.item.amount:'') + '' + v 
      } else {
        this.item.amount = String(this.item.amount).slice(1)
      }
    },
    cancel(){
      
      if(!this.ui.routeLeave) {
        console.log('cancel',this.ui.routeLeave);
        this.$router.push('/kassa/menu') // PATCH BasketTab onBlur
      }
      this.ui.routeLeave = false
    },
    addToBasketBlank(){
      console.log('add to basket blank');
      // this.$refs.basket.add()
      this.$resetData();
    },
    addToBasket(item){
      item.quantity = 1
      this.addToBasketRaw(item)
    },
    addToBasketRaw(item){
      console.log('Adding');
      if(item && (item.amount||item.price)){
        if(item.amount && !item.price){
          item.pirce = item.amount
        } else if(!item.amount && item.price){
          item.amount = item.pirce
        }

        this.$refs.basket.add(item)
        this.$resetData();
      }
    },
    select(){
      
    },
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
        console.log('tender',sale);
        this.ui.showModalCheck = true
        // this.sale = sale
      })
    }
  }
}
</script>

<style lang="stylus">

.nav-tabs.fliped
  border-bottom none
  border-top 1px solid #ddd
  margin-top -0.81rem
  
  .nav-item
    margin-bottom 0
    margin-top -1px 
  
  .nav-link
    border-radius 0 0 .3rem .3rem
    padding .5rem 1rem .65rem
  
  .nav-link.active
    border-color: #fff #ddd #ddd

.kassa.tabbed 

  #basket
    margin-left -18px
    padding-top 1.5rem
    // padding-bottom 1.5rem
    
  #main
    padding 0
    z-index 2

</style>  
<style scoped lang="stylus">
.kassa
  height 40rem
  
.text-white.bg-secondary::placeholder
  color white  
  
.card
  overflow hidden
  

.kassa.tabbed 
  .card
    background-color rgba(0,0,0,.03)
    
    .list-group-item.active
      // background-color rgba(0,123,255,0.2)
      background-color #fff
      color rgba(0,123,255,1)
      border-color rgba(0,0,0,.25)
      border-left 1px solid #fff
      
      // margin-top -1px
      // padding-left 52px
      // width 322px
      position relative
      z-index 5
      
    .card-header.check-header
      height 3.1rem
      
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
