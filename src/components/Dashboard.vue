<template lang="pug">
div
  .jumbotron
    h1.display-3 Онлайн Чеки
    |           
    p.lead
      | Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
    |           
    p
      a.btn.btn-lg.btn-success(href='#', role='button') Начать Работу
  |         
  b-row.marketing
    b-col
      h4 Новости
      p Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.

      h4 События
      p Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.

      h4 Вопросы и Ответы
      p Maecenas sed diam eget risus varius blandit sit amet non magna.

    b-col
      h4 Блог
      p Maecenas sed diam eget risus varius blandit sit amet non magna.

      h4 Цены
      p Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.

      h4 Помощь
      p Maecenas sed diam eget risus varius blandit sit amet non magna.
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
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
    prevTasks(){
      console.log('prevTasks');
    },
  }
}
</script>

<style lang="stylus">

#modalDiagram .modal-dialog
  max-width: fit-content;
    
</style>
