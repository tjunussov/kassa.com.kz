<template lang="pug">
div

  h4 App {{$route.params.name}}
  p Описание Программы
  
</template>

<script>
export default {
  name: 'AppForm',
  data () {
    return {
      msg: 'AppForm'
    }
  },
  mounted(){
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
 .container-fluid
   margin-top 20px
</style>