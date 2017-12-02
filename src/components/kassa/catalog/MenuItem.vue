<template lang="pug">
//- b-card(title="Card Title"
//-     img-src="https://lorempixel.com/600/300/food/5/"
//-     img-alt="Image"
//-     img-top
//-     tag="article"
//-     style="max-width: 20rem;"
//-     class="mb-2")
b-card.text-center(header="Item")
    p.card-text Item
</template>

<script>

export default {
  name: 'menuItem',
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
     
    },
  }
}
</script>

<style lang="stylus">

  
</style>
