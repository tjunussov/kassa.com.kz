<template lang="pug">
ItemForm(v-bind="$props")
  h4.mb-4 Контакты
</template>

<script>

import ItemForm from './template/ItemForm'

export default {
  name: 'contactForm',
  props:['item'],
  data () {
    return {
    }
  },
  mounted(){
  },
  components:{
    ItemForm
  },
  methods:{
  }
}
</script>

<style lang="stylus">
  
</style>

