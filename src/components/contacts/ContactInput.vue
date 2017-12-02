<template lang="pug">
input.form-control(
    :id="id"
    ref="input"
    :placeholder="placeholder"
    :value="format(value)"
    @input="parse($event.target.value)")
</template>

<script>
// import _debounce from "lodash.debounce"

export default {
  name: 'ContactInput',
  props:{
    placeholder:String,
    id:{
      required: true
    },
    value: {
      required: true
    }
  },
  methods:{
    format(v){
      console.log('format',v);
      if(v && v.code_){
        return this.$options.filters.name(v.name) + ' ('+v.code_+')';
      }
      return v
    },
    // parse:_debounce(function(v){
    //   if(v && v.length > 0){
    //     var name = v.match(/[a-z\u0400-\u04FF]+/gi);
    //     var code = v.match(/[\d]+/g);
    //     if(code && name)
    //       v = { name : name.join(" "), code_: code.join("") }
    //   } 
    //   console.log('parse',v);
    //   this.$emit("input",v)
    // },1000),
    parse(v){
      if(v && v.length > 0){
        var name = v.match(/[a-z\u0400-\u04FF]+/gi);
        var code = v.match(/[\d]+/g);
        if(code && name)
          v = { name : name.join(" "), code_: code.join("") }
      } 
      console.log('parse',v);
      this.$emit("input",v)
    }
  }
}
</script>
