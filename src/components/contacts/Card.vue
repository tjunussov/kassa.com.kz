<template lang="pug">
div(@click="$emit('click')")
  form.vcard.editable(v-if="editable",tabindex="1",@invalid="invalid=true",@submit.prevent="submit",
    :class="{isNew:isNew}")

    a.close(v-if="selected_.name",@click.stop.prevent="$reset") ×

    input.form-control.h4(
      placeholder="Имя",
      autofocus,
      v-model="selected_.name",
      @keyup.enter.prevent="nextInput($event)")

    input.form-control.phone(
      placeholder="Телефон",
      pattern="[7]{1}[0-9]{10}",
      size="11",
      maxlength="11",
      required,
      v-model="selected_.code_",
      @keyup="$emit('filter',{ code_: $event.target.value}) ")

    input(type="submit",style="position: absolute; left: -9999px")
    //- textarea.form-control(placeholder="Add note",v-model="contact.note")
  div.vcard(v-else)
    button.close(@click.stop.prevent="$emit('remove')") ×
    h4 {{ contact.name }} 
    span.phone {{ contact.code_ }}
    | {{ contact.note }}    
</template>

<script>

export default {
  name: 'Card',
  props: ['selected','contact','editable'],
  data () {
    return {
      invalid:false,
      isNew:true,
      selected_: {
        code_:"",
        name:"",
        date_:new Date(),
        updated:null,
        type:"client"
      }
    }
  },
  created () {
  },
  watch: {
    selected(val) {
      if(val.name){
        // console.log('Setted contact, and detaching it',val);
        this.selected_ = this.$_clone(val);
        // this.selected_ = val;
        this.isNew = false
      } else {
        // this.$resetData(false); TODO УДАЛИЛ ВЧЕРА
      }
    }
  },
  computed : {
  },
  methods : {
    /*reset () {
      // otherwise will be reseting global
      console.log("reset local");
    },*/
    submit () {
      console.log("submit");
      this.selected_.updated = new Date();

      this.isNew ? this.$emit('add', this.selected_) : this.$emit('update', this.selected_)
      this.$emit('submit', this.selected_)

      this.$resetData();
    },
    nextInput(e) {
      e.target.nextSibling.focus();
      return false

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

$selection = #3297FD

  .vcard
    border 1px solid #ccc
    margin:10px 0
    padding 15px 20px
    
  .selected .vcard, .vcard:focus, .vcard.isNew
    border-color $selection
  
  .vcard:not(:hover) .close
    opacity 0
  
  .phone
    font-size  20px !important
    font-weight 100 !important
    font-family inherit !important
    
  .inprogress .phone
    border-bottom-color #f00 !important
    
  
  h4
    margin-bottom 5px
    
  form:valid.editable .form-control
    border-bottom-color #aaa
    
  .editable, .close
    transition 0.2s all ease-in

  .editable:not(:focus):not(:hover)
    opacity 0.5
    border-color transparent
    
  .editable .form-control
    border-radius 0
    border none
    border-bottom 1px solid #ddd
    padding 0 0 5px 0
    width 90%
    
    
  .editable .form-control::placeholder
    font-weight 100
    color #ccc
  
  .editable .form-control.h4
    font-size: 1.5rem
    
  .editable .form-control.phone:not(:focus) + .form-control
    display none
    
</style>
