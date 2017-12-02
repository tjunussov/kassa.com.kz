<template lang="pug">
div

  h4 {{user.name}}
  b-form-group(label="PIN")
    b-form-input(v-model="user.pin")

  b-button Сменить PIN
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'profile',
  computed : {
    ...mapGetters({
        group: 'getGroupSelected',
        config: 'getConfigSelected',
    }),
    user(){
      return this.group.users.filter((i)=>{
        console.log(i.name == this.config.currentUser);
        return i.name == this.config.currentUser
      })[0]
    },
  },
  methods:{
    
  }
}

</script>

<style lang="stylus">

</style>
