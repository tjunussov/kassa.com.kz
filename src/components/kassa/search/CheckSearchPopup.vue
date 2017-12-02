<template lang="pug">
doctype html
b-input-group
  b-form-input#checkSearch(
    Zsize="lg"  
    v-model="value" 
    placeholder="#Чек" 
    @keyup.native="salesSetFilter({ 'no': $event.target.value })"
    :readonly="thinking")

  b-popover(target="checkSearch"
           triggers="focus"
           placement="bottom"
           ref="saleSearchPopover")
    .checkSearch(v-if="value")
      b-list-group
        b-list-group-item(v-for="(s, index) in sales" 
          :key="s.uuid" 
          :to="{path:'/sales/check',check:s.uuid, checkObj:s}") 

          .d-flex.w-100.justify-content-between
            h6.mb-1 # {{s.no}}
            span {{s.payList.total | money}} ₸
      .text-center.text-muted.my-1(v-show="count > limit") Еще...

    div(v-else) Введите номер чека ...
  b-input-group-addon(slot="right")
    .fa.fa-align-justify
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CheckSearchPopup',
  data () {
    return {
      value:null
    }
  },
  mounted(){
    // this.$store.dispatch('salesSetPage', 1)
    
    this.$store.dispatch('salesSetFilter','')
    this.$store.dispatch('salesSetLimit', 10)
  },
  computed: {
    ...mapGetters({
        selected: 'getSalesSelected', 
        sales: 'getSales',
        count: 'getSalesCount',
        limit: 'getSalesLimit',
        thinking: 'getSalesThinking'
    })
  },
  components:{
    
  },
  methods:{
    ...mapActions([
      'salesSelect',
      'salesSetFilter'
    ]),
    deleteItem(){
      
    },
    select(){
      this.$router.push("/kassa/contact")
    }
  }
}
</script>

<style lang="stylus" scoped>
  .checkSearch
    width 15rem
    margin -9px -14px
  
    .list-group-item
      border-left none
      border-right none
      border-bottom none
  
</style>
