<template lang="pug">
div
  h4#item-1 Профиль Организации
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      tr
        td Идентификатор
        td: b-form-input(disabled :value="group.uuid")
      tr
        td Код ( Домен )
        td: b-form-input(readonly :value="group.code_+'.com.kz'")
      tr
        td Наименование
        td: b-form-input(v-model="group.name")
      tr
        td БИН\ИИН
        td: b-form-input(v-model="kassa.legal.bin")
      tr
        td Наименование ИП
        td: b-form-input(v-model="kassa.legal.name")
      tr
        td Юридический адрес
        td: b-form-textarea(v-model="kassa.legal.address" :rows="2")
      tr
        td Плательщик НДС
        td: b-form-checkbox(v-model="kassa.legal.nds" value="yes" unchecked-value="no")
</template>

<script>
export default {
  name: 'MerchantSettings',
  props:['kassa','group','config','kkm'],
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