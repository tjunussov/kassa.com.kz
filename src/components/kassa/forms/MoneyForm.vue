<template lang="pug">
TenderForm(v-bind="$props")
  h4.mb-4 Оплата
</template>

<script>

import TenderForm from './template/TenderForm'

export default {
  name: 'moneyForm',
  props:['item'],
  data () {
    return {
    }
  },
  mounted(){
  },
  components:{
    TenderForm
  },
  methods:{
  }
}
</script>

<style lang="stylus">
  
</style>