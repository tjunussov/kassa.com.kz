<template lang="pug">
div
 
  h4#item-1 Настройки
  p Установка кассы совершается путем настройки системы

  table.table
    tbody

      tr
        td Вид отрасли по умолчанию
        td
          b-form-select
            option(value="Gasoil") Обеспечения нефтепродуктами
            option(value="Hotels") Отели и рестораны
            option(value="Parking") Стоянки
            option(value="Services") Сфера услуг
            option(value="Taxi") Такси
            option(value="null") Торговая сфера
      tr
        td Режим "Покупка"
        td: b-form-checkbox
      tr 
        td Режим "Пункт обмена валют"
        td: b-form-checkbox
      tr
        td Проверка акцизной марки на алкогольную продукцию
        td: b-form-checkbox

  h4#item-1 Закрытие смены
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      tr
        td Автономные чеки в модуле печати
        td: b-form-checkbox
      tr
        td Автоматическое изъятие наличных
        td: b-form-checkbox
      tr
        td Автоматическое закрытие смены
        td: b-form-checkbox
      tr
        td Время ежедневного автоматического закрытия смены
        td: b-input-group
              b-form-input(placeholder="23")
              b-input-group-addon ч
              b-form-input(placeholder="00")
              b-input-group-addon мин
      tr
        td  Пользователь от имени которого будет закрываться смена
        td
          b-form-select
            option(selected="selected", value="30894") Иванов И.И.

  h4#item-1 Уведомления
  p Установка кассы совершается путем настройки системы

  table.table
    tbody
      tr
        td E-mail список для автоматического получения Z-отчетов
        td: b-input-group
              b-input-group-addon On
              b-form-input
              b-input-group-button(slot="right") 
                b-btn Тест
      tr
        td Отправлять действия на Email
        td: b-form-checkbox


</template>

<script>
export default {
  name: 'Settings',
  props:['group','config','kkm'],
  data () {
    return {
      msg: 'KKMSettings'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
 
</style>