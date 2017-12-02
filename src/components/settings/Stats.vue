<template lang="pug">
div
  h4#item-1 Информация о Смене
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      tr
        td Номер смены
        td 4
      tr
        td Открытие смены
        td 20.10.201 17:53
      tr
        td Наличных в кассе            
        td 0,00            
      tr
        td Количество продаж
        td 3 чека на сумму 2 100,00 тг            
      tr
        td Возвратов продаж
        td 0 чеков на сумму0,00 тг            
      tr
        td Продаж наличными
        td 6 500,00            
      tr
        td Продаж банковской картой            
        td 21600,00
      tr
        td Количество покупок
        td 0 чеков на сумму 0,00 тг
      tr
        td Количество возвратов покупок
        td 0 чеков на сумму ,00 тг            
      tr
        td Внесение            
        td 0,00            
      tr
        td Изъятие            
        td 0,00            
      tr
        td Сумма НДС            
        td 0,00            
      tr
        td Количество документов            
        td 3
      tr
        td Закрытие смены
        td 20.10.2017 17:54
      
  
</template>

<script>
export default {
  name: 'Stats',
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