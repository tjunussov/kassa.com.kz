<template lang="pug">
doctype html
b-popover(target="itemsSearch"
         triggers="focus"
         placement="bottom"
         ref="itemsSearchPopover")
  .itemsSearch
    b-list-group
      b-list-group-item(v-for="(i, index) in items" 
        :key="i.code_" 
        :to="{path:'/items',item:i.code_, itemObj:i}") 

        .d-flex.w-100.justify-content-between
          h6.mb-1 {{i.name}}
          span {{i.amount | money}} ₸
    .text-center.text-muted.my-1(v-show="count > limit") Еще...
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ItemSearchPopup',
  data () {
    return {
      value:null
    }
  },
  mounted(){
    // this.$store.dispatch('salesSetPage', 1)
    // this.$store.dispatch('itemsSetLimit', 10)
  },
  computed: {
     ...mapGetters({
        items: 'getItems',
        count: 'getItemsCount',
        limit: 'getItemsLimit'
    })
  },
  components:{
    
  },
  methods:{
    ...mapActions([
      'itemsSetLimit'
    ]),
    deleteItem(){
      
    },
    select(){
      this.$router.push("/items")
    }
  }
}
</script>

<style lang="stylus" scoped>
  .itemsSearch
    width 25rem
    margin -9px -14px
  
    .list-group-item
      border-left none
      border-right none
      border-bottom none
  
</style>
