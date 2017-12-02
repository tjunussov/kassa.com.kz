<template lang="pug">
div.sales.mb-4
  
  b-row.sales-header.mb-3
    b-col
      b-nav.float-right(pills)
        b-nav-item(to="/sales/list" :variant="ui.asTable?'light':'primary'" title="Список"): .fa.fa-list
        b-nav-item(to="/sales/timeline" variant="light" title="Timeline"): .fa.fa-facebook-square
        b-nav-item(to="/sales/calendar" variant="light" disabled title="Календарь"): .fa.fa-calendar
        b-nav-item(to="/sales/location" variant="light" disabled title="Комнатам"): .fa.fa-map-marker
        b-nav-item(to="/sales/table" variant="light" title="Таблица"): .fa.fa-table

      h2 Лента

  b-row.mb-3
    b-col
      b-button-group
        b-button(size="sm") Вчера
        b-button(size="sm") Сегодня
        b-button(size="sm") Завтра

      b-button-group.ml-3
        b-button(size="sm") Открытые/Текущие
        b-button(size="sm") Закрытые
        b-button(size="sm") Черновики/Записи

      b-button-group.ml-3
        b-button(size="sm") Продажи
        b-button(size="sm") Возвраты
        b-button(size="sm") Покупки

      b-button-group.ml-3
        b-button(size="sm") Up
        b-button(size="sm") Down

  .sales-body.h-100
    router-view(@ztize="ztize" :selected="selected" :stats="stats" :sales="sales" :now="now")

  ModalZCheck(v-if="ui.showModalZCheck" @hidden="cancel" Zdone="cancel" :stats="stats")      
</template>

<script>


import ModalZCheck from './check/ModalZCheck'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'salesPage',
  data () {
    return {
      ui:{asTable:false,showModalZCheck:false},
      sort: null,
      handleScroll: null,
      now: new Date(),
      sales:[]
    }
  },
  mounted(){
    console.log(this.$options.name,'mounted');
    this.$store.dispatch('salesSetLimit', 100)
    this.salesByDate()
    // this.$store.dispatch('salesSetQuery',{ between:{ created_: new Date(),  })


    /*if(this.sales.length == 0)
      this.$store.dispatch('salesSetPage', 1)*/
    // document.addEventListener('click', this.documentClick)
    // this.handleScroll = new InfiniteList(this.$refs.infinite, 'sales', this.$store)
  },
  destroyed () {
    // this.handleScroll.unset()
    document.removeEventListener('click', this.documentClick)
  },
  computed: {
    ...mapGetters({
        selected: 'getSalesSelected', 
        // sales: 'getSales',
        page: 'getSalesPage', 
        nbPages: 'getSalesNbPages', 
        count: 'getSalesCount',
        limit: 'getSalesLimit',
        thinking: 'getSalesThinking', 
        infinite: 'getSalesInfinite',
        hydrated: 'hydrated',
    }),
    stats(){
      if(!this.sales||this.sales.length == 0) 
        return {
          total:0
        };
      // Agregating Sales by to list
      return this.sales.reduce(function (a, b) {
        a.total = a.total + b.payList.total
        if(!b.payList.items) return a
        return b.payList.items.reduce(function (x, y) {
            x.payList[y.name] = (x.payList[y.name]?x.payList[y.name]:0) + y.amount
            return x
        },a)
      }, { total:0, payList:{} });
    },
  },
  components:{
    ModalZCheck
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
    cancel(){
      this.ui.showModalZCheck = false
    },
    ztize(){
      this.ui.showModalZCheck = true
    },
    salesByDate(){

      var from = new Date(this.now)
      // if(from.getHours() < 8 ) { // если время меньше 8 часов утра, то берем за предыдуший день
      //   from.setDate(from.getDate() - 1);
      // }
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);

      var to = new Date(from);
      // if(to.getHours() >= 8 ) { // если время меньше 8 часов утра, то берем за предыдуший день
      //   to.setDate(to.getDate() + 1);
      // }
      to.setDate(to.getDate() + 1);

      this.$db.sales.where('meta_.accounted').between(from,to).reverse().toArray((a)=>{
        this.sales = a
        // console.log('sales',this.sales);
      });
      // this.$store.commit('SALES_LOAD_SUCCESS', sales)
    },
    salesSubmit (){
      console.log('submitted');
    },
    salesListClick(e){

    },
    documentClick (e){
      this.salesSelect();
    }
  }
}
</script>

<style lang="stylus">
  

.container{
  overflow: visible;
}
  
</style>

