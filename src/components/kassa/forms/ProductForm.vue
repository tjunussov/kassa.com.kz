<template lang="pug">
ItemForm(v-bind="$props")
  h4.mb-4 Товар
</template>

<script>

import ItemForm from './template/ItemForm'

export default {
  name: 'productForm',
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

