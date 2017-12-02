<template lang="pug">
div.mb-4
  table.table
    tbody
      tr
        td Автоматическое скачивание чека в pdf
        td: b-form-checkbox(v-model="kassa.autoDownloadCheck")

  Check(:sale="sale")
  
</template>

<script>
import Check from '@/components/kassa/check/Check'

export default {
  name: 'CheckSettings',
  props:['group','config','kassa','kkm'],
  data () {
    return {
      msg: 'Help',
      sale:{
        no:"1",
        buyList:{
          contact:{
            name:"ИП Иванов И.И",
            bin:"871121351099",
            nds:"yes",
            address:"г.Астана, ул.1, д.2, оф.3",
          },
          total:670,
          items:[
            {count:2,price:90,discount:'1%',amount:180,name:"Позиция 1"},
            {count:0,amount:490,name:"Позиция 2"}
          ]
        },
        payList:{
          contact:{
            name:"Иванов Иван",
            code_:"+7 795 000-01-00"
          },
          total:1000,
          excess:330,
          items:[
            {amount:500,name:"Наличные"},
            {amount:500,name:"Банковская Карта"}
          ]
        },
        meta_:{ 
          created:new Date(),
          accounted:new Date(),
          owner:"Иванов Иван",
          code:"1",
        },
        app:{
          fiscal:{
            created:new Date(),
            ofd:"КГДРК(БЛОКЧЕЙН)",
            code:"XXXXXX",
            codeToken:"123456",
            isOffline:true,
            ink:"KASSA.kz",
            rnk:'XXXXXXXXXXXX',
            znk:"SWKXXXXXXXX"
          }
        }
      }
    }
  },
  components:{
    Check
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>