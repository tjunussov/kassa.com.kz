<template lang="pug">
router-view
</template>

<script>

export default {
  name: 'basketForm',
  props:['item'],
  data () {
    return {
      name:null,
      amount:null,
    }
  },
  mounted(){
    console.log('basketForm mounted');
  },
  components:{
    
  },
  methods:{
  }
}
</script>

<style lang="stylus">
// .counts .btn
//   padding 0.8rem 1.5rem
//   font-size 2rem
  

  
</style>
