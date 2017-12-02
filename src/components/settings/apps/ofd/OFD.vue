<template lang="pug">
div
      
</template>

<script>

export default {
  name: 'name',
  data () {
    return {
      selectedFilter:null,
    }
  },
  mounted(){
    
  },
  components:{
    
  },
  methods:{
    folderList(){
      return CamundaService.task.folderList(this).then((resp)=>{
        return this.filters = resp.data
      })
    },
  }
}
</script>

<style lang="stylus">

  
</style>
