<template lang="pug">
input(ref="input" 
  :class="'paymentInput'+i"
  v-model="val"
  @input="updateValue($event.target.value)"
  @keyup.enter="$event.target.blur()"
  @click.stop="$emit('toggleManualEnter',true)"
  @contextmenu.prevent.stop="$emit('toggleManualEnter',false)"  
  @focus="selectAll"
  Zblur="formatValue(val)")
</template>
<script>

export default {
  name:'input-moneyz',
  props: {
    value: {
      type: Number,
      default: 0
    },
    label: {
      type: String,
      default: ''
    },
    i: {
      type: Number
    }
  },
  data () {
    return {
      val:this.value
    }
  },
  watch:{
    value(val){
      this.formatValue(val)
    }
  },
  mounted: function () {
    this.formatValue(this.value)
  },
  methods: {
    updateValue: function (value) {
      // console.log('updateValue ',value);
      var sanitized = this.clearValue(value)
      this.val = this.formatValue(sanitized)
      this.$emit('update:value', sanitized)
    },
    clearValue(value){
      return Number(value.replace(/[^0-9.]/g,''))
    },
    formatValue: function (val) {
      // console.log('formatValue ',val);
      this.val = this.$options.filters.money(val)+' ₸'
    },
    selectAll: function (event) {
      this.$emit('toggleManualEnter',true)
      // Workaround for Safari bug
      // http://stackoverflow.com/questions/1269722/selecting-text-on-focus-using-jquery-not-working-in-safari-and-chrome
      setTimeout(function () {
      	event.target.select()
      }, 0)
    }
  }
}

</script>