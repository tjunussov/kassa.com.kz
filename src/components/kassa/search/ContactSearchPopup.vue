<template lang="pug">
doctype html
b-popover(target="contactSearch"
         Ztriggers="click blur"
         triggers="focus"
         placement="bottom"
         offset="0"
         ref="contactSearchPopover")
  .contactSearch
    .text-center.text-muted.m-2(v-if="contacts.length == 0") Введите имя/номер клиента ...
    b-list-group
      b-list-group-item(v-for="(c, index) in contacts" 
        :key="c.code_"
        @click.stop="select(c)") 
        .d-flex.w-100.justify-content-between
          span.mr-2 {{c.name}}
          b {{c.code_ | tel}}
    .text-center.text-muted.my-1(v-show="count > limit") Еще...

  
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CheckSearchPopup',
  // props: ['contact','value'],
  mounted(){
    this.$store.dispatch('contactsSetLimit', 10)
  },
  computed: {
    ...mapGetters({
        selected: 'getContactsSelected', 
        contacts: 'getContacts',
        count: 'getContactsCount',
        limit: 'getContactsLimit',
        thinking: 'getContactsThinking'
    })
  },
  components:{
    
  },
  methods:{
    ...mapActions([
      'contactsSelect',
    ]),
    select(c){
      console.log('clok');
      this.contactsSelect(c)
      this.$root.$emit('bv::hide::popover');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .contactSearch
    width fit-width
    margin -9px -14px
  
    .list-group-item
      border-left none
      border-right none
      border-bottom none
  
</style>
