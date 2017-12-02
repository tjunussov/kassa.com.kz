<template lang="pug">
doctype html
.pin-buttons.text-center
  b-button(variant="outline-secondary" @click="digit") 1
  b-button(variant="outline-secondary" @click="digit") 2
  b-button(variant="outline-secondary" @click="digit") 3

  b-button(variant="outline-secondary" @click="digit") 4
  b-button(variant="outline-secondary" @click="digit") 5
  b-button(variant="outline-secondary" @click="digit") 6

  b-button(variant="outline-secondary" @click="digit") 7
  b-button(variant="outline-secondary" @click="digit") 8
  b-button(variant="outline-secondary" @click="digit") 9

  b-button.muted(variant="outline-secondary" @click="clear"): .fa.fa-chevron-left
  b-button(variant="outline-secondary" @click="digit") 0
  b-button.muted(variant="outline-secondary" @click="enter"): .fa.fa-share

</template>

<script>

export default {
  name: 'pinpad',
  props:['value'],
  watch:{
    value(val){
    },
  },
  data () {
    return {
      pin: null
    }
  },
  methods:{
    digit(event){
      var append = String(this.value?this.value:'')
      this.$emit('input',append + event.target.innerText);
    },
    enter(){
      this.$emit('enter');
    },
    clear(){
      this.$emit('input',String(this.value).slice(0, -1));
    }
  }
}
</script>

<style scoped lang="stylus">
  .pin-buttons
    
    button
      min-height 4rem
      min-width 5rem
      font-size 2rem
      font-weight 500
      margin 0.1rem
      
    
    //   min-height 3rem
    //   min-width 4rem
    

</style>
