<template lang="pug">
doctype html
.d-flex.autocomplete
  slot
    b-form-input(
      :id="target"
      :value="value" 
      :placeholder="placeholder" 
      @input="updateValue"
      @keyup.native="filter($event.target.value)"
      :class="{'text-danger':thinking,'text-primary':isNew}")
  b-popover(:target="target" Ztriggers="click blur" v-bind="$props")
    .autocomplete-list
      slot(name="no-result" v-if="list.length == 0")  Please type for search ...
      b-list-group
        b-list-group-item(v-for="(c, index) in list" 
          :key="index"
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
    value:{required: true},
    target:{
      type: String,
      default: "autocomplete",
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
    }
  },
  data () {
    return {
      search:null,
      isNew:false,
      _isFromSelected:false,
    }
  },
  watch:{
    value(v){
      this.filter(v)
    }
  },
  mounted(){
    console.log('mounted',this.store);
    this.$store.dispatch(`${this.store}SetLimit`, 10)
  },
  computed:{
    ...mapGetters({
        list:'getContacts',
        thinking: 'getContactsThinking',
        selected: 'getContactsSelected',
        count: 'getContactsCount',
        limit: 'getContactsLimit',
    })
  },
  methods:{
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
      this.$emit('filter',c,(a)=>{
        console.log('autocomplete filter',a,this.store);
        this.$store.dispatch(`${this.store}SetFilter`,a)  
      })
    },
    select(c){
      this.$emit('select',c,(a)=>{
        console.log('autocomplete select',a);
        // this.$store.dispatch(`${this.store}Select`,c)
        this.$emit('input',a)
        this.$root.$emit('bv::hide::popover');
      })
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
