<template lang="pug">
doctype html
b-list-group-item.cursorHand(
  v-if="item"
  Zv-b-toggle="'collapseDelete'+i" 
  @click="select"
  @contextmenu.prevent="(item.ui.disabled?$emit('delete',item):null);item.ui.disabled=true;" 
  :class="{cartDisabled:item.ui.disabled,cartLocked:item.ui.locked,active:isRouteActive,'text-primary':changed,'changed':changed}")
  b-row.no-gutters
    b-col(cols="8")
      slot
      i.fa.text-muted.mr-2(v-if="iconMap[item.name]" @click.stop="$emit('iconClick')" v-bind:class="iconMap[item.name]")
      b {{name||item.name}}   
      span(v-if="item.quantity && item.quantity > 1") x {{item.quantity}} 
    //- b-col.text-right {{amount||item&&item.amount | money}} ₸
    b-col(cols="4")
      CartItemMoneyz.text-right.w-100.flat(
        v-bind:value.sync="amount" 
        :i="i"
        @toggleManualEnter="toggleManualEnter"
        :class="{'autoCal':!item.ui.manualEnter}")
  b-row
    //- b-col Кол-во {{item.quantity}}шт
    b-col: span(v-if="item.discount") {{item.discount<0?'Скидка':'Наценка'}} {{item.discount}}%
  //- b-collapse.mt-2(:id="'collapseDelete'+i")
  //-   .text-center(@click="$emit('deleteItem',item)") Delete
</template>

<script>

import CartItemMoneyz from './CartItemMoneyz'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartItem',
  props:['item','name','i','to'],
  data () {
    return {
      iconMap:{
        "Наличные":"fa-money",
        "Банковская карта":"fa-credit-card",
        "Сертификат":"fa-credit-card",
      },
      changed:null
    }
  },
  watch: {
    'item.quantity': 'onChanged'
      
  },
  mounted(){
    this.onChanged()
  },
  computed: {
    ...mapGetters({
        // no: 'getCurrentSaleNo',
        hydrated:'hydrated'
    }),
     amount:{
      get () {
        if(!this.item.ui.manualEnter && this.item.price && this.item.quantity )
          return this.item.amount = Math.floor(this.item.price * this.item.quantity * ( 1 + this.item.discount/100))
        else
          return this.item.amount
      },
      set (value) {
        console.debug('amount set',value);
        this.item.amount = value
      }      
    },
    /*link(){
      return this.to + '/' + this.i
    },*/
    isRouteActive(){
      return this.$route.params && this.$route.params.type == this.item.type_ && this.$route.query.tab == this.i
    }
  },
  components:{
    CartItemMoneyz
  },
  methods:{
    onChanged(){
      clearTimeout(this.changed)
      this.changed = setTimeout(()=>{
        this.changed = null
      },500)
    },
    deleteItem(){
      
    },
    toggleManualEnter(state){
      this.item.ui.manualEnter=state
    },
    select(){

      if(this.item.ui.disabled){
        this.item.ui.disabled=false
        event.stopPropagation()
        event.preventDefault()
        return false
      } else {

        

        this.$router.push({
          path:`/kassa/cart/${this.item.type_}`,
          name:this.item.type_+'Form',
          query: { tab: this.i }, // Just For Refresh
          params:{
            type:this.item.type_,
            item:this.item
          }
        });
      }
    }
  }
}
</script>

<style lang="stylus">
.cartDisabled, .cartLocked
  opacity 0.5
  font-weight normal !important
  background-color #ccc
  
.cartDisabled
  text-decoration line-through !important
  
.cartLocked
  background repeating-linear-gradient(135deg, rgba(41,150,204,0.1), rgba(41,150,204,0.1) 5px, #ccc 5px, #ccc 10px)


.autoCal
  font-style italic
  opacity 0.5
  
  

  
  
</style>
