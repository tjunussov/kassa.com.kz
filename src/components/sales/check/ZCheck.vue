<template lang="pug">
  pre(v-if="stats")
    center
      |ТОО ИП "Иванов И.И."
      |БИН\ИИН 871121351099 
      |Z - ОТЧЕТ
      |--------------------------------------
      |20.10.2017 12:00
    | Документ №12                  Кассир 1 
    | --------------------------------------
    |              Смена №1 
    | Продажи:
    | Кассир №1                  Иванов И.И.
    |
    |
    span(v-for="(val, key, index) in stats.to" :key="key")
      | {{ val | moneyz | lpad(key)}}{{'\n'}}
    | Кредит                           0,00
    | Тара                             0,00
    | Внесение                         0,00
    | Изъятие                          0,00
    | Возврат                          0,00
    |
    | {{ stats.total | moneyz | lpad('Итог')}}
    |
    |
    center
      | ИНK: 655855115287 
      | РНK: 655855115287 
      | ЗНК: SWK00031019
</template>

<script>

export default {
  name: 'check',
  props:['stats'],
  data () {
    return {
      selectedFilter:null
    }
  },
  mounted(){
    
  },
  components:{
    
  },
  methods:{
    folderList(){
     
    },
    pad(){
      var args = [...arguments];
      return args[0] + String(args[1]).padStart(this.padWidth-args[0].length)
      // return args.join('-')

    }
  }
}
</script>

<style scoped lang="stylus">
Zpre 
  padding 2rem 1rem
  margin 0
  font-size 0.8rem
  display inline-block
  font-family 'Consolas'
  border 1px solid #ccc
  
</style>
