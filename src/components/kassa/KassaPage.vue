<template lang="pug">
doctype html
div.kassa.tabbed
  b-row.h-100.no-gutters
    b-col.h-100.no-padding#main(cols="8")

      b-card.d-flex.h-100.flex-column(no-body @click.prevent.stop="select")
        div(slot="header")
          b-row
            b-col(sm="8")
              b-input-group
                b-input-group-addon.light-border(v-b-modal.modalLibrary)
                  .fa.fa-briefcase
                b-form-input#itemsSearch.light-border(
                  v-model="item.name" 
                  Zsize="lg" 
                  type="text" 
                  placeholder="Наименование товара ..." 
                  @keyup.native="itemsSetFilter({ name: $event.target.value })")
                ItemSearchPopup
            
            b-col(sm="4")
              b-input-group
                b-input-group-addon.light-border(v-b-toggle.collapseExtra)
                  .fa.fa-angle-down
                b-form-input.text-right.light-border(@keyup.enter.native="addToCartRaw(item)" v-model.number="item.amount" Zsize="lg" placeholder="0 ₸" autofocus)
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
          router-view(@addToCart="addToCart")
        b-card-footer
          b-nav.fliped(Zfill tabs)
            b-nav-item(to="/kassa/menu") Меню
            b-nav-item(to="/kassa/calc") Калькулятор
            b-nav-item(to="/kassa/items") Каталог
            //- b-nav-item(to="/kassa/tender") Расчеты
    
    b-col.h-100#cart(cols="4")
      Cart.h-100(ref="cart" @addBlank="addToCartBlank")




</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Cart from '@/components/kassa/Cart'
import ItemSearchPopup from '@/components/kassa/search/ItemSearchPopup'

export default {
  name: 'kassa',
  data () {
    return {
      ui:{routeLeave:false},
    }
  },
  computed: {
    ...mapGetters({
        item: 'getCartItemSelected',
        items: 'getItems'
    })
  },
  mounted(){
    this.$bus.$on('mouse:click',this.cancel);
  },
  beforeDestroy(){
    this.$bus.$off('mouse:click',this.cancel);
  },
  components:{
    Cart,ItemSearchPopup
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
      'itemsSetLimit'
    ]),
    cancel(){
      
      if(!this.ui.routeLeave) {
        console.log('cancel',this.ui.routeLeave);
        this.$router.push('/kassa/menu') // PATCH BasketTab onBlur
      }
      this.ui.routeLeave = false
    },
    addToCartBlank(){
      console.log('add to basket blank');
      this.$refs.cart.add()
      this.$resetData();
    },
    addToCart(item){
      item.quantity = 1
      this.addToCartRaw(item)
    },
    addToCartRaw(item){
      console.log('Adding');
      if(item && (item.amount||item.price)){
        if(item.amount && !item.price){
          item.pirce = item.amount
        } else if(!item.amount && item.price){
          item.amount = item.pirce
        }

        this.$refs.cart.add(item)
        this.$resetData();
      }
    },
    select(){
      
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
  

  .col-4
    -ms-flex: 0 0 30%
    flex: 0 0 30%
    max-width: 30%
    
  .col-8
    -ms-flex: 0 0 70%
    flex: 0 0 70%
    max-width: 70%
  
  
  // .card > .card-header:first-child
  //     min-height 4.6rem
      
  .card
    .list-group-item.active
      background-color #fff
      color rgba(0,123,255,1)
      border-color rgba(0,0,0,.250)
      border-left 1px solid #fff
      margin-left -1px !important
      
    .list-group-item
      background-color transparent
    

  #cart
    // padding-top 1.5rem
    // padding-bottom 1.5rem
      
    &> div > .card:first-of-type
      border-bottom-left-radius 0
      border-top-left-radius 0
      border-left none
      
    .card-header.card-modal-header
      display flex
      align-items center
      justify-content space-between
      // height 4rem
      
    .card-body
      // background-color rgba(0,0,0,.01)
      
    .card-header:first-child
      border-top-left-radius 0
    
    .card-footer:last-child
      border-bottom-left-radius 0

      .btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle)
        border-bottom-left-radius: 0;
        
    .list-group-item
      border-color rgba(0,0,0,.1)
      border-top none
      border-right none
      border-left none
    
  #main
    z-index 2
    
    &> .card
      border-bottom-right-radius 0
      border-top-right-radius 0
      
      
    &> .card-header:first-child
      border-top-right-radius 0
    
    &> .card-footer:last-child
      border-bottom-right-radius 0
    
    

</style>  
<style scoped lang="stylus">
.kassa
  height 43rem
  
.text-white.bg-secondary::placeholder
  color white  
  
.card
  overflow hidden
  

  
</style>
