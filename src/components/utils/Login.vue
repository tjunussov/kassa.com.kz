<template  lang="pug">
  doctype html

  b-form.form-signin.pt-3(@submit.prevent="login")
    b-alert(v-if="message != null" show)
      h6 {{message.title}}
      | {{message.message}} 
    label.sr-only(for="inputUsername") Username
    b-form-input(id="inputUsername" v-model="form.username" placeholder="Username" required autofocus)
    label.sr-only(for="inputPassword") Password
    b-form-input.mb-3(type="password" v-model="form.password" id="inputPassword" placeholder="Password" required)
    b-alert(variant="danger" v-if="isError != null" show) {{isError}}
    .checkbox.mb-3
      label
        input(type="checkbox" value="remember-me")/  Remember me
    b-button(variant="primary" type="submit" class="" block) Sign in

</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      form:{
        username:"",
        password:""
      },
      isError:null,
      tm:null,
      message: null
      // {
      //   title:"Logout successful", 
      //   message:"Thank you for using Camunda!"
      // }
    }
  },
  mounted() {
    
  },
  watch : {
    isError(){ 
      this.$emit("error",this.isError);
    }
  },
  methods:{

    login(){
      this.isError = null
    }
  }
}
</script>

<style scoped lang="stylus">
  
.form-signin input#inputUsername
  margin-bottom: -1px
  border-bottom-right-radius: 0
  border-bottom-left-radius: 0

.form-signin input[type="password"]
  border-top-left-radius: 0
  border-top-right-radius: 0
  
h6
  margin-bottom 0
  
</style>
