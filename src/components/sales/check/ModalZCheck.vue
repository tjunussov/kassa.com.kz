<template lang="pug">
doctype html
b-modal#modalZCheck(
  Zvisible 
  @hidden="cancel"
  Zno-fade)
  div(slot="modal-title")
    | Итого

  ZCheck(v-bind="$props")

  hr/

  b-form-group
    b-input-group
      b-input-group-addon.text-muted
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

  .w-100.text-center(slot="modal-footer")
    b-dropdown.btn-block(variant="dark" right dropup split @click="done" text="ОК")

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
import ZCheck from './ZCheck'
export default {
  name: 'modalCheck',
  props:['stats'],
  data () {
    return {
      ui: { printer:null,printSecond:true },
    }
  },
  mounted(){
    this.$root.$emit('bv::show::modal', 'modalZCheck')
  },
  components:{
    ZCheck
  },
  methods:{
    done(){
      console.log('done');
      this.$emit('done')
      this.$root.$emit('bv::hide::modal', 'modalZCheck')
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
