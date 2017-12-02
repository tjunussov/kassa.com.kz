<template lang="pug">
TenderForm(v-bind="$props")
  h4.mb-4 Список Оплат
</template>

<script>

import TenderForm from './template/TenderForm'

export default {
  name: 'tender',
  props:['listPayments'],
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
    folderList(){
    },
  }
}
</script>

<style lang="stylus">

  
</style>
