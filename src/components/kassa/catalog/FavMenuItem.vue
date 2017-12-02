<template lang="pug">
//- b-card(title="Card Title"
//-     img-src="https://lorempixel.com/600/300/food/5/"
//-     img-alt="Image"
//-     img-top
//-     tag="article"
//-     style="max-width: 20rem;"
//-     class="mb-2")
b-card.text-center(:class="item.type_" no-body)
  b-card-body.py-3.p-2
    h1.text-muted {{item.name | codify}}
  b-card-footer.text-overflow.p-1
    i.fa.text-muted.mr-1(v-if="iconMap[item.type_]" v-bind:class="iconMap[item.type_]")
    | {{item.name}}
</template>

<script>

export default {
  name: 'FavMenuItem',
  props:['item'],
  data () {
    return {
      iconMap:{
        "money":"fa-database",
        "resource":"fa-clock-o",
        "group":"fa-folder-open-o",
      }
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
</style>
