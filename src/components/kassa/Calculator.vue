<template lang="pug">
div.calc-buttons
 b-button.spec: .fa.fa-cube
 b-button.ripple(@click="digit") 1
 b-button.ripple(@click="digit") 2
 b-button.ripple(@click="digit") 3
 
 b-button.spec: .fa.fa-coffee
 b-button.ripple(@click="digit") 4
 b-button.ripple(@click="digit") 5
 b-button.ripple(@click="digit") 6

 b-button.spec: .fa.fa-archive
 b-button.ripple(@click="digit") 7
 b-button.ripple(@click="digit") 8
 b-button.ripple(@click="digit") 9

 b-button.spec: .fa.fa-heart
 b-button.ripple(@click="clear"): .fa.fa-chevron-left
 b-button.ripple(@click="digit") 0
 b-button.ripple(@click="enter" variant="success"): .fa.fa-share

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'name',
  data () {
    return {
      name:null,
      amount:null
    }
  },
  computed: {
    ...mapGetters({
        item: 'getCartItemSelected',
        items: 'getItems'
    })
  },
  methods:{
    special(event){
      console.log('special',event.target.innerText);
      // this.$emit('special',event.target.innerText);
    },
    digit(event){
      console.log('non special',event.target.innerText);
      this.item.amount = (this.item.amount?this.item.amount:'') + '' + Number(event.target.innerText) 
    },
    clear(){
      this.item.amount = String(this.item.amount).slice(0,-1)
    },
    enter(){
      this.$emit('addToCart',this.item);
    },
  }
}
</script>

<style scoped lang="stylus">
  .calc-buttons 
    button
      min-height 6.5rem
      min-width 8.7rem
      font-size 2.5rem
      font-weight 500
      margin 0.4rem

    .spec
      background-color #ccc
      color #999
      border-color #ccc
  
</style>
