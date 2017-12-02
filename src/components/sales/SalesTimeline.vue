<template lang="pug">
b-row.sales-list.infinite
  b-col(sm="4")
    b-card.mb-4(v-for="(s, index) in sales" no-body
      :key="s.uuid" 
      :title="s.uuid") 

      b-card-header
        h5 {{s.name}}
        small {{s.accounted_?s.accounted_:s.created_  | time}} - {{s.from.contact.name}}
      b-card-body
        b-row
          b-col
            tel(:contact="s.to.contact")
        b-row
          b-col(v-if="s.from.items") 
            h6.my-2 Позиции
            div(v-for="i in s.from.items") {{i.name}} - {{i.amount}}
        b-row
          b-col(v-if="s.to.items") 
            h6.my-2 Оплата
            div(v-for="i in s.to.items") {{i.name}} - {{i.amount}}
      b-card-footer
        h5.text-muted.text-right  Итог {{s.total | money}} ₸
  b-col
      
</template>

<script>

export default {
  name: 'salesTimeline',
  props:['sales','selected'],
  data () {
    return {
      test:null
    }
  },
  methods:{
  }
}
</script>

<style lang="stylus">

</style>

