<template lang="pug">
div
  h4#item-1 Общая Информация
  p Установка кассы совершается путем настройки системы
  
  table.table
    tr
      td Заводской номер
      td {{kkm.znk}}
    tr
      td Идентификационный номер
      td {{kkm.legal.ink}}
    tr
      td Описание кассы
      td {{kkm.name}}
    tr
      td Регистрационный номер
      td {{kkm.legal.rnk}} от {{kkm.legal.rnk_date}}
    tr(v-if="config.lastCheck")
      td Номер последнего запроса
      td {{config.lastCheck.no}} - {{config.lastCheck.result}}
    tr
      td Вид отрасли по умолчанию
      td {{group.businessType}}
    //- tr
    //-   td Режим "Покупка"
    //-   td Включен
    //- tr
    //-   td Наценка
    //-   td Отключен
    tr
      td Обслуживающее ЦТО
      td {{group.serviceDealer}}
    tr
      td Тарифны план
      td {{group.paymentPlan}}
    tr
      td Режим работы
      td.text-success {{config.workMode}}
 

</template>

<script>

export default {
  name: 'GroupOverview',
  props:['group','config','kkm'],
  data () {
    return {
      msg: 'GroupOverview'
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
 
</style>