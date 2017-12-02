<template lang="pug">
doctype html
b-form.p-3
  b-form-group(label="Наличные" horizontal)
    b-button-toolbar(justify)

      b-btn 1000
      b-btn 1200
      b-btn 1500
      b-btn 2000

  b-form-group(label="" horizontal)
    b-input-group
      b-input-group-addon ₸
      b-form-input.text-right(placeholder="1500" autofocus)
      b-input-group-button(slot="right") 
        b-button(variant="primary" v-b-modal.modalCheck) Оплатить

  hr/

  b-form-group(label="Карточка" horizontal)
    b-input-group
      b-input-group-addon ₸
      b-form-input.text-right(placeholder="0")
      b-input-group-button(slot="right") 
        b-button(variant="primary" v-b-modal.modalCheck) Оплатить

  hr/

  b-form-group(label="" horizontal)
    b-button(variant="light" block) Другие методы оплаты ...
</template>

<script>

export default {
  name: 'tender',
  data () {
    return {
      name:null,
      amount:null,
      list:[
        {code:"CC",name:"Coca Cola",amount:6000},
        {code:"CF",name:"Кофе",amount:6000},
        {code:"SP",name:"Спрайт",amount:6000},
        {code:"SP",name:"Торт",amount:6000},
        {code:"SP",name:"Чизи",amount:6000},
        {code:"SP",name:"Напиток",amount:6000},
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
