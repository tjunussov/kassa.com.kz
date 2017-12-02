<template lang="pug">
SalesBasketLayout(v-bind="$props" @ztize="$emit('ztize')")
  b-list-group
    b-list-group-item(v-for="(s, index) in sales" 
      :key="s.uuid" 
      :title="s.uuid" 
      :class="{'selected': selected && selected.uuid === s.uuid}" 
      v-bind:index="index" 
      @contextmenu.native.prevent="salesRemove(s)"  
      @click="salesSelect(s)") 

      .d-flex.w-100.justify-content-between
        h5.mb-1 
          i.fa.fa-sticky-note-o  
          |  {{s.no}} 
        h5 {{s.payList.total | money}} ₸
      p.mb-1 
        tel(:contact="s.payList.contact")
        | {{s.buyList.contact?s.buyList.contact.name:''}}
      b-row
        b-col(v-if="s.buyList.items") 
          div(v-for="i in s.buyList.items") {{i.name}}
            span.ml-2.text-muted {{i.amount}}
        b-col(v-if="s.payList.items") 
          div(v-for="i in s.payList.items") {{i.name}} 
            span.ml-2.text-muted {{i.amount}}
      small {{s.meta_.code}} - {{s.meta_.owner}} - {{s.meta_.accounted?s.meta_.accounted:s.meta_.created  | time}}
      
</template>

<script>

import SalesBasketLayout from './SalesBasketLayout'

export default {
  name: 'salesList',
  props:['sales','selected','stats','now'],
  data () {
    return {
      test:null
    }
  },
  components:{
    SalesBasketLayout
  },
  methods:{
    salesSelect(){

    },
    salesRemove(){
      
    }
  }
}
</script>

<style lang="stylus">

</style>

