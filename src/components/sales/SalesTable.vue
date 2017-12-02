<template lang="pug">
b-table.mt-4(striped hover :items="sales")
</template>

<script>

export default {
  name: 'salesTable',
  props:['sales'],
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

