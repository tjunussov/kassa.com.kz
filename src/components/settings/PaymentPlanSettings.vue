<template lang="pug">
div
  h4 Тарифный План
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      tr
        td Тарифный План
        td 
          b-form-radio-group(v-model="group.paymentPlan")
            b-form-radio(value="Стандартный") Стандартный
            b-form-radio(value="Pro") Pro

</template>

<script>
export default {
  name: 'PaymentPlanSettings',
  props:['group','config','kkm'],
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