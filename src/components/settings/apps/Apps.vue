<template lang="pug">
div
 
  h4 Apps Store
  p Магазин Приложений

  b-card.mb-2(v-for="a in config.apps"  :key="a.name" :header="a.name")
    | {{a.name}}
  
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'apps',
  props:['group','config','kkm'],
  computed: {
    ...mapGetters({
        apps: 'getApp',
    }),
  },
  data () {
    return {
      msg: 'Help'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>