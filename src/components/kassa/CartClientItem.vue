<template lang="pug">
doctype html
b-list-group-item.check-client
  b-row
    b-col 
      b-input-group.flat
        b-input-group-addon
          //- router-link(to="/basket/client"): 
          i.fa.fa-id-card-o(:class="{'text-primary':isNew}")/ 
        b-form-input#contactSearch(
          :value="search" 
          placeholder="Клиент..." 
          @input="updateValue"
          @keyup.native="contactsSetFilter({ 'code_': $event.target.value })"
          Zreadonly="thinking"
          :class="{'text-danger':thinking}")
      ContactSearchPopup
  //- b-row(v-if="contact")
  //-   b-col {{contact.code}}
  //- b-collapse.mt-2#collapseClientDelete
  //-   .text-center(@click="$emit('deleteItemClient')") Без Клиента
</template>

<script>
import ContactSearchPopup from './search/ContactSearchPopup'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CartClientItem',
  props:['value'],
  data () {
    return {
      search:null,
      isNew:false,
      _isFromSelected:false,
    }
  },
  mounted(){
  },
  computed: {
    ...mapGetters({
        thinking: 'getContactsThinking',
        selected: 'getContactsSelected',
    })
  },
  watch:{
    value(val){
      console.debug('value set',val);
      this.setSearchValue(val);
    },
    selected(val){
      console.log('selected',val);
      this._isFromSelected = true
      this.setSearchValue(this.selected);
    }
  },
  components:{
    ContactSearchPopup
  },
  methods:{
    ...mapActions([
      'contactsSetFilter'
    ]),
    setSearchValue(val){
      if(val){
        if(val.code_)
          this.search = this.$options.filters.name(val.name) + ' ('+val.code_+')';
        else 
          this.search = val
      } else {
        this.search = ""
      }
    },
    updateValue(val){
      if(this._isFromSelected) { 
        console.log('Enter from Selected');
        this._isFromSelected = false
        this.isNew = false
        this.$emit('input',this.selected)
      } else {
        console.log('Enter not from Selected',val);
        this.isNew = true
        this.$emit('input',val)
      }
    },
    select(){
      this.$router.push("/kassa/contact")
    }
  }
}
</script>

<style lang="stylus">

  
</style>
