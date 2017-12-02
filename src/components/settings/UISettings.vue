<template lang="pug">
div
  h4#item-1 Общие настройки
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      
      tr
        td Способ округления
        td 
          b-form-select(v-model="group.kassa.roundingType")
            option(value="None") Без округления
            option(value="EveryItem") Округление каждой позиции
            option(value="Total") Округления итога
      tr
        td.help-text(colspan="2")
          table.table.table-condensed
            caption.text-center Пример
              tr
                td Позиции 1                      
                td 1.55 x 10 тг
                td = 15.5 тг
              tr
                td Позиции 2                           
                td 2.4 x 2 тг
                td = 4.8 тг                                  
              tr.text-bold
                td(colspan="2") Итог
                td = 20.3 тг
      tr
        td Временная зона
        td: b-form-select(v-model="group.timezone")
              option(value="GMT+5") (UTC+05:00) Екатеринбург
              option(value="GMT+6") (UTC+06:00) Астана

      tr
        td Способ ввода скидки
        td 
          b-form-select(v-model="group.kassa.dicountEntryMode")
            option(value="%") %
            option(value="Cash") тг.
      tr
        td(colspan="2")
          b-form-group(horizontal)
            div(slot="label") Наценка
            b-input-group
              b-input-group-addon
                input(type="checkbox" :plain="true" v-model="group.kassa.allowExtraCharge.enabled")
              b-form-input(v-model="group.kassa.allowExtraCharge.name" placeholder="Наименование" :disabled="!group.kassa.allowExtraCharge.enabled")
              b-form-input.text-right(v-model="group.kassa.allowExtraCharge.value" placeholder="Значение наценки по умолчанию в %" :disabled="!group.kassa.allowExtraCharge.enabled")
              b-input-group-button(slot="right")
                b-dropdown(:text="group.kassa.allowExtraCharge.onTotal?'на чек':'на позицию'" right variant="light" :disabled="!group.kassa.allowExtraCharge.enabled")
                  b-dropdown-item(@click="group.kassa.allowExtraCharge.onTotal = true") на чек
                  b-dropdown-item(@click="group.kassa.allowExtraCharge.onTotal = false") на позицию
      tr
        td Настройка типов оплаты
        td: b-form-select(v-model="group.kassa.defaultPayments" :plain="true" :options="paymentsTypes" multiple :select-size="4")
      tr
        td Запретить ручной ввод товаров
        td: b-form-checkbox(v-model="group.kassa.disableManualEntry")
      
  
</template>

<script>
export default {
  name: 'UISettings',
   props:['group','config','kkm'],
  data () {
    return {
      paymentsTypes:['Наличные','Банковская Карта','Кредит','Тара']
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>