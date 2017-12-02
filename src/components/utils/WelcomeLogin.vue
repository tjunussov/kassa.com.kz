<template  lang="pug">

  b-card(:class="{isLoginError}")
    h4.form-signin-heading Welcome Camunda
    Login(@error="(v)=>{ isLoginError = v }")

</template>

<script>
import Login from '@/components/utils/Login'

export default {
  name: 'welcomelogin',
  data () {
    return {
      isLoginError:null
    }
  },
  components:{
    Login
  },
}
</script>

<style lang="stylus">
// .container, .container-fluid
//   max-width 340px
//   padding-top 5rem
</style>

<style scoped lang="stylus">
.isLoginError
  border 1px solid #f00
  -webkit-animation: shake .5s linear;
  
</style>