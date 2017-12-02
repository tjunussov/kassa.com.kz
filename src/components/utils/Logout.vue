<template  lang="pug">
div
</template>

<script>
export default {
  name: 'Logout',
  mounted(){
    this.$store.dispatch('switchUser',{key:null}) // clearning USER
    this.$router.push('/');
  }
}
</script>
