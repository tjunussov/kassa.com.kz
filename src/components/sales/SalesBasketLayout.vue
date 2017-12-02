<template lang="pug">
div
  b-row.h-100
    b-col.h-100(sm="8")

      b-form-group
        b-form-input(
          @keyup.native="salesSetFilter({ 'no': $event.target.value })"
          :readonly="thinking"
          placeholder="Введите чек"
          )

      .sales-list.infinite(ref="infinite",@click.stop="salesListClick")
        slot

      .p-3
        b-button.mr-1(size="sm" @click="salesSetPage(--page)" :disabled="page <= 1 || thinking") PREV 
        | Page {{ page }} of {{ nbPages }} 
        | From {{ (page-1)*limit }} to {{ page*limit }} of {{ count }} elements
        b-button.mx-1(size="sm" @click="salesSetPage(++page)" :disabled="page >= nbPages || thinking") NEXT
        span.mr-1(v-if="hydrated") Hydrated

    b-col(sm="4")
     b-card.h-100(no-body)
        b-card-header.card-modal-header
          h5 {{now | date}}
          button.close ×
        b-card-body.scroll-y.no-padding
          b-list-group(flush)
            b-list-group-item(v-for="(item, key, index) in stats.payList" :key="key")
              | {{key}} {{item | money}} ₸
        b-card-footer.text-center.text-light.no-padding
          b-dropdown.total-button.btn-block(size="lg" variant="primary" right split dropup @click="$emit('ztize')")
            template(slot="button-content") 
              h5 Итог {{ stats.total | money}} ₸
            b-dropdown-header Операции
            b-dropdown-item(href="#") Z-Отчет
            //- b-dropdown-header Наличные
            b-dropdown-divider
            b-dropdown-item(href="#") Внесение
            b-dropdown-item(href="#") Изъятие
      
</template>


<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'salesBasketLayout',
  props:['sales','stats','now'],
  data () {
    return {
      test:null
    }
  },
  computed: {
    ...mapGetters({
        page: 'getSalesPage', 
        nbPages: 'getSalesNbPages', 
        count: 'getSalesCount',
        limit: 'getSalesLimit',
        thinking: 'getSalesThinking',
        infinite: 'getSalesInfinite',
        hydrated: 'hydrated',
    })
  },
  methods:{
    ...mapActions([
      'salesSelect',
      'salesAdd',
      'salesRemove',
      'salesUpdate',
      'salesSetFilter',
      'salesSetLimit'
    ]),
    salesListClick(){
      
    }
  }
}
</script>

<style lang="stylus">
.infinite{
  min-height: 600px;
  max-height: 600px;
  min-width: 600px;
  overflow-y: auto;
}
</style>

