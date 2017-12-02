<template lang="pug">
.tel(v-if="contact") {{ contact.name?contact.name:contact }} 
  span.phone {{ contact.code_?contact.code_:'Без номера' }}
</template>

<script>

export default {
  name: 'Tel',
  props: ['contact','name','code'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  .tel .phone
    background-color rgba(0,0,0,0.1)
    padding 2px 5px
    font-family monospace
    font-size 11px
    
</style>
