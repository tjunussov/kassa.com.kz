<template lang="pug">
div
  h2 Сообщения
  hr/
  b-table.mt-4(striped hover :items="items" :fields="fields")
      
</template>

<script>

export default {
  name: 'sales',
  data () {
    return {
      fields: [ 
        {
          key: 'first_name',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'last_name',
          label: 'Код',
          sortable: true,
        },
        {
          key: 'age',
          label: 'Цена',
          class: 'text-right'
        }
      ],
      items: [
        { isActive: true,  age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true,  age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
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

