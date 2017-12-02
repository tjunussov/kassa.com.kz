<template lang="pug">
b-card-group.favmenu(deck)
  FavMenuItem.ripple(v-for="(m,index) in items" :key="m.name" :item="m" @click.native="$emit('addToCart',m)")
</template>

<script>
import FavMenuItem from './FavMenuItem'

export default {
  name: 'favMenu',
  data () {
    return {
      items:[]
    }
  },
  created(){
    // this.itemsSetFilter({ type_: 'product' })
    
    this.$db.items.orderBy('meta_.favmenu').toArray().then(r=>{
      this.items = r
    });
  },
  components:{
    FavMenuItem
  },
  methods:{
    
  }
}
</script>

<style lang="stylus">
.favmenu
  margin -0.5rem
  
  .card
    flex 0 0 auto
    width 7rem 
    margin 0.4rem
    cursor pointer
    transition  background 0.2s ease-out, color 0.2s ease-out, border-color 0.5s ease-out
    // transition .2s all ease-in
    
    &:hover
      color #007bff
      background-color: rgba(0,123,255,0.05)
      border-color #007bff70
      
    &:active
      background-color: rgba(0,123,255,0.3)
      
    &.money 
      background-color rgba(0,123,255,0.2)
    
    &.resource
      background-color rgba(255,123,0,0.2)
    
    &.group
      background-color rgba(123,0,255,0.2)
      
    &.modifier
      background-color rgba(123,255,123,0.2)
      
    .text-overflow
      white-space nowrap
      text-overflow ellipsis
      overflow-x hidden
    
    
</style>
