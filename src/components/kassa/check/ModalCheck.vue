<template lang="pug">
doctype html
b-modal#modalCheck(
  visible 
  @hidden="cancel"
  body-bg-variant="dark"
  no-fade)
  div(slot="modal-title")
    | Чек {{sale.no}}
    //- small.ml-2(v-if="sale.app && sale.app.fiscal")
    //-   b-badge(pill) Фискальный

  Check(v-bind="$props")

  .w-100.text-center(slot="modal-footer")

    b-form-group
      b-input-group
        b-input-group-addon.text-success
          .fa.fa-print 
        b-form-select(placeholder="Принтер" v-model="ui.printer")
          option(:value="null") EPSON TM88V - 80mm

    b-form-group#AppSMSManage
      b-input-group
        b-input-group-addon.text-muted
          .fa.fa-comments
        b-form-input(placeholder="Tel" readonly)
        //- b-input-group-button(slot="right") 
        //-   b-button(variant="light") Выслать

    b-form-group
      b-input-group
        b-input-group-addon.text-muted
          .fa.fa-envelope 
        b-form-input(placeholder="Email")

    //- b-form-group.text-center
    //-   b-form-checkbox(v-model="ui.printSecond") Дополнительный чек

    
    b-dropdown.btn-block(variant="primary" right dropup split @click="done" text="Печать")
      b-dropdown-item(active) 1 Чек
      b-dropdown-item 2 Чека
      b-dropdown-item 3 Чека

  b-popover(target="AppSMSManage"
             triggers="hover"
             placement="top"
             offset="5"
             container="modalCheck"
             title="SMS Услуга не подключена"
             ref="popover")
      b-btn(size="sm" variant="success") Подлючить
    
</template>

<script>
import Check from './Check'
export default {
  name: 'modalCheck',
  props:['sale'],
  data () {
    return {
      ui: { printer:null,printSecond:true },
    }
  },
  mounted(){
    console.log('mounted');
    // this.$root.$emit('bv::show::modal', 'modalCheck')
  },
  components:{
    Check
  },
  methods:{
    done(){
      console.log('done');
      this.$emit('done')
      this.$root.$emit('bv::hide::modal', 'modalCheck')
    },
    cancel(){
      console.log('mc cancel');
      this.$emit('hidden')
    }
  }
}
</script>

<style scoped lang="stylus">
  
</style>
