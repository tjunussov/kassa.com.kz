<template lang="pug">
  pre
    |         ТОО ИП "Иванов И.И."
    |         БИН\ИИН 871121351099 
    |          ОТЧЕТ ПО КАССИРАМ
    | --------------------------------------
    |           20.10.2017 12:00
    |
    | Документ №12                  Кассир 1 
    | --------------------------------------
    |              Смена №1 
    | Продажи:
    | Кассир №1                  Иванов И.И.
    | Наличные                    54 720,00
    | Банковская карта                 0,00
    | Кредит                           0,00
    | Тара                             0,00
    | Внесение                     1 111,00
    | Изъятие                          0,00
    | Возврат                          0,00
    | Итог                        54 720,00
    |
    | Покупки:
    | Наличные                         0,00
    | Банковская карта                 0,00
    | Кредит                           0,00
    | Тара                             0,00
    | Возврат покупок                  0,00
    | Итог                             0,00
    |
    | Итог                        54 720,00
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
ZZpre 
  margin-left 0.5rem
  padding 2rem 1rem
  font-size 0.8rem
  display inline-block
  font-family 'Consolas'
  border 1px solid #ccc
  
</style>
