<template lang="pug">
div
  
  .header
    b-button.float-right(@click="ui.asTable=!ui.asTable" :variant="ui.asTable?'primary':'light'")
      .fa.fa-table

    h2 Контакты

  .contacts(v-if="!ui.asTable")
    b-row
      b-col(sm="6")

        .contacts-list.infinite(ref="infinite",@click.stop="contactsListClick")

          card(editable="true",
            :selected="selected",
            :class="{'inprogress':thinking}",
            @add="contactsAdd",
            @update="contactsUpdate",
            @submit="contactsSubmit",
            @filter="contactsSetFilter",
            @reset="contactsSelect")

          card(v-for="(c, index) in contacts" 
            :contact="c" 
            :key="c.code_" 
            :class="{'selected': selected && selected.code_ === c.code_}" 
            v-bind:index="index" 
            @remove="contactsRemove(c)" 
            @click="contactsSelect(c)")
    b-row
      b-col.p-3

        b-button.mr-1(size="sm" @click="contactsSetPage(--page)" :disabled="page <= 1 || thinking") PREV 
        | Page {{ page }} of {{ nbPages }} 
        | From {{ (page-1)*limit }} to {{ page*limit }} of {{ count }} elements
        b-button.mx-1(size="sm" @click="contactsSetPage(++page)" :disabled="page >= nbPages || thinking") NEXT
        span.mr-1(v-if="hydrated") Hydrated

  b-table.mt-4(v-if="ui.asTable" striped hover :items="contacts")
      
</template>

<script>
import Card from './Card'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'contacts',
  data () {
    return {
      ui:{asTable:false},
      fields: [ 
        {
          key: 'first_name',
          label: 'Название',
          sortable: true,
        },
        {
          key: 'last_name',
          label: 'Код',
          sortable: true,
        },
        {
          key: 'age',
          label: 'Цена',
          class: 'text-right'
        }
      ],
      contact:{
        code_:"",
        name:"",
        date_:new Date(),
        updated:new Date(),
        type:"client"
      },
      sort: null,
      handleScroll: null
    }
  },
  mounted(){
    this.$store.dispatch('contactsSetPage', 1)
    document.addEventListener('click', this.documentClick)
    // this.handleScroll = new InfiniteList(this.$refs.infinite, 'contacts', this.$store)
  },
  destroyed () {
    // this.handleScroll.unset()
    document.removeEventListener('click', this.documentClick)
  },
  computed: {
    ...mapGetters({
        selected: 'getContactsSelected', 
        contacts: 'getContacts',
        page: 'getContactsPage', 
        nbPages: 'getContactsNbPages', 
        count: 'getContactsCount',
        limit: 'getContactsLimit',
        thinking: 'getContactsThinking', 
        infinite: 'getContactsInfinite',
        hydrated: 'hydrated',
      })
  },
  components:{
    Card
  },
  methods:{
    ...mapActions([
      'contactsSelect',
      'contactsAdd',
      'contactsRemove',
      'contactsUpdate',
      'contactsSetFilter',
      'contactsSetLimit'
    ]),
    contactsSubmit (){
      console.log('submitted');
    },
    contactsListClick(e){

    },
    documentClick (e){
      this.contactsSelect();
    }
  }
}
</script>

<style lang="stylus">

  
</style>

