<template lang="pug">

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
        |  {{s.name}}
      h5 {{s.total | money}} ₸
    p.mb-1 
      tel(:contact="s.to.contact")
      | {{s.from.contact.name}}
    b-row
      b-col(v-if="s.from.items") 
        div(v-for="i in s.from.items") {{i.name}} - {{i.amount}}
      b-col(v-if="s.to.items") 
        div(v-for="i in s.to.items") {{i.name}} - {{i.amount}}
    small {{s.accounted_?s.accounted_:s.created_  | time}}
      
</template>

<script>

export default {
  name: 'salesLocation',
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

