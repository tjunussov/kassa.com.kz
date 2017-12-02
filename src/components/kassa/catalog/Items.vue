<template lang="pug">
  b-table(striped hover :items="items" :fields="fields" empty-text="Добавить ...") 
    template(slot="name" slot-scope="data") 
      div(:title="data.item.meta_" @click="$emit('addToCart',data.item)") 
        | {{data.value}}
        small.text-muted.ml-2 {{data.item.sku}}
        i.fa.text-muted.ml-2(v-if="iconMap[data.item.type_]" v-bind:class="iconMap[data.item.type_]") 
    template(slot="count" slot-scope="data") {{data.value}}
    template(slot="price" slot-scope="data") {{data.value | money }} ₸
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Items',
  data () {
    return {
      fields: [ 
        { key: 'name', label: 'Наименование' },
        { key: 'count', label: 'Кол-во', class:'text-right' },
        { key: 'price', label: 'Цена', class:'text-right' },
      ],
      iconMap:{
        "money":"fa-database",
        "resource":"fa-clock-o",
        "group":"fa-folder-open-o",
      }
    }
  },
  computed: {
    ...mapGetters({
        selected: 'getItemsSelected', 
        items: 'getItems',
        page: 'getItemsPage', 
        nbPages: 'getItemsNbPages', 
        count: 'getItemsCount',
        limit: 'getItemsLimit',
        thinking: 'getItemsThinking', 
        infinite: 'getItemsInfinite',
        hydrated: 'hydrated',
    })
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
