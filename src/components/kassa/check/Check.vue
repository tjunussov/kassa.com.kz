<template lang="pug">
.check
  pre
    center
      h3(v-if="buyerContact.name != group.name") {{group.name}}
      | {{ sale.buyList.contact.name | pad(17) }} {{ 'БИН '+sale.buyList.contact.bin | lpad('',18) }}
      | {{ sale.buyList.contact.address }}
    |--------------------------------------
    center
      |{{sale.meta_.accounted | datetime }}
    | {{ ( sale.meta_.owner || 'Кассир 1') | shortFio | lpad('Документ №'+sale.meta_.code)}}
    | {{ currentKKM.name | lpad('Касса:') }}
    | {{(sale.payList.contact?(sale.payList.contact.name?sale.payList.contact.name:sale.payList.contact):'Не указан') | lpad('Клиент:')}}{{'\n'}}
    template(v-if="sale.payList.contact && sale.payList.contact.code_") {{sale.payList.contact.code_ | cols('Тел:')}}{{'\n'}}
     |
    | --------------------------------------
    |
    template(v-if="sale.buyList.items")
      template(v-for="(i, index) in sale.buyList.items")
        | {{ i.amount | moneyz | lpad(i.name)}}{{'\n'}}
        template(v-if="i.quantity && i.quantity > 1")     {{i.quantity}} x {{i.price | moneyz}} {{'\n'}}
        template(v-if="i.discount")     Скидка {{i.discount}} {{'\n'}}
    |
    template(v-if="sale.payList.items")
      |-------------------------------------
      |
      template(v-for="(i, index) in sale.payList.items" v-if=" i.amount > 0")
        | {{ i.amount | moneyz | cols(i.name+':')}}{{'\n'}}
      template(v-if="sale.payList.excess!=0")
        | {{ sale.payList.excess | moneyz | cols(sale.payList.excess &gt; 0?'Сдача:':'Недоимка:')}}{{'\n'}}
    |
    b {{ sale.buyList.total | moneyz | cols('ИТОГО:')}}{{'\n'}}
    |
  pre.fiscal(:class="fiscalStatus")
    template(v-if="fiscalStatus == 'pending'")
      |
      b ========= ФИСКАЛИЗАЦИЯ ЧЕКА ==========
      |
    template(v-if="sale.app.fiscal.error")
      .graph.text-danger
        | ╔════════ ОШИБКА ФИСКАЛИЗАЦИИ ═══════╗
        | ║{{sale.app.fiscal.error | padcenter(35) }} ║
        | ╚════════════════════════════════════╝
    template(v-if="sale.app.fiscal.code")
      .graph
        | ╔════════ ФИСКАЛЬНЫЙ ЧЕК ФП ═════════╗
        | ║ {{ sale.app.fiscal.created | strndate | lpad('Дата',16) }}   {{ sale.app.fiscal.created | strtime | lpad('Время',15) }} ║
        | ║ {{ sale.app.fiscal.code | lpad('Фиск.признак'+(sale.app.fiscal.isOffline?' (автономный)':''),34)}} ║
        | ║ {{ sale.app.fiscal.rnk | cols('КОД ККМ КГД / РНК:',18,16)}} ║
        | ║ {{ sale.app.fiscal.znk | cols('ЗНК:',18,16)}} ║
        template(v-if="!sale.app.fiscal.ofd")
          |
          | ╚════════════════════════════════════╝
        template(v-else)
          |
          | ╠═══════╦════════════════════════════╣
          | ║ BINGO ║ {{ sale.app.fiscal.ink | lpad('ИНK:',26)}} ║
          | ║ 65554 ║ {{ sale.app.fiscal.ofd | lpad('ОФД:',26)}} ║
          | ╚═══════╩════════════════════════════╝
      template(v-if="sale.app.fiscal.ofd")
        center
          b Проверка Чека :
        |      Сайт : check.gov.kz/{{sale.app.fiscal.codeToken}}
        //- |  Telegram : t.me/CheckGovKzBot?start={{sale.app.fiscal.codeToken}}
        |  Telegram : @CheckGovKzBot {{sale.app.fiscal.codeToken}}
        | Тел(USSD) : *1414*5*{{sale.app.fiscal.codeToken}}#
        |       Тел : 1414,5{{sale.app.fiscal.codeToken}}#
    
  pre
    center
      | *** СПАСИБО ЗА ПОКУПКУ ***
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'check',
  props:['sale'],
  computed: {
    ...mapGetters({
        group: 'getGroupSelected',
        fiscalStatus: 'fiscalStatus',
        checkoutStatus:'checkoutStatus',
        buyerContact : 'buyerContact',
        currentKKM : 'currentKKM'
    })
  }
}
</script>

<style lang="stylus">

      
  
</style>
