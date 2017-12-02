<template lang="pug">
doctype html
.d-flex.autocomplete
  b-form-input(
    id="autocomplete"
    :value="search" 
    :placeholder="placeholder" 
    @input="updateValue"
    @keyup.native="filter($event.target.value)"
    :class="{'text-danger':thinking,'text-primary':isNew}")
  b-popover(target="autocomplete" Ztriggers="click blur" v-bind="$props")
    .autocomplete-list
      slot(name="no-result" v-if="list.length == 0")  Please type for search ...
      b-list-group
        b-list-group-item(v-for="(c, index) in list" 
          :key="c[storeFilter]"
          @click.stop="select(c)") 
          slot(name="result-list" :item="c") {{c}}
      .text-center.text-muted.my-1(v-show="count > limit") Еще...
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AutoComplete',
  props: {
    store:{
      type: String,
      required: true
    },
    editable:{
      type: Boolean,
      default: false
    },
    placement:{
      type: String,
      default: "bottom"
    },
    offset:{
      type: String,
      default: "0"
    },
    defaultValue:String,
    placeholder:String,
    triggers:{
      type: String,
      default: "focus"
    },
    store-filter:{
      type: String,
      required: true
    }
  },
  data () {
    return {
      search:null,
      isNew:false,
      _isFromSelected:false,
    }
  },
  mounted(){
    console.log('mounted',this.storeFilter,this.store);
    this.$store.dispatch(`${this.store}SetLimit`, 10)
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
  computed: {
    ...mapGetters({
        selected: 'getContactsSelected', 
        list: 'getContacts',
        count: 'getContactsCount',
        limit: 'getContactsLimit',
        thinking: 'getContactsThinking'
    })
  },
  components:{
    
  },
  methods:{
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
    filter(c){
      console.log('filter',this.storeFilter);
      this.$store.dispatch(`${this.store}Filter`, {[this.storeFilter]:c})
    },
    select(c){
      console.log('autocomplete select');
      this.$store.dispatch(`${this.store}Select`, с)
      this.$root.$emit('bv::hide::popover');
    }
  }
}
</script>

<style lang="stylus" scoped>
  .autocomplete-list .list-group
    width fit-width
    margin -9px -14px
  
    .list-group-item
      border-left none
      border-right none
      border-bottom none
  
</style>
