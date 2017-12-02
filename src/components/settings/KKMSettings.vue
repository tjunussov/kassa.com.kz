<template lang="pug">
div
 
  h4#item-1 Контрольно-кассовый аппарат
  p Редактирование ККМ

  b-dropdown.m-md-2.block(:text="kk.name")
    b-dropdown-item(
      v-for="(k,index) in kkms" :key="k.name" 
      :active="k.name == kk.name"
      :class="{'text-muted':k.disabled,'font-weight-bold':index == config.currentKKM }"
      @click="selectKKM(k)" ) 
      | {{k.znk}} - {{k.name}} 
    b-dropdown-divider
    b-dropdown-item
      b-link(@click="createKKM" variant="warning") Создать


  fieldset(v-if="kk" :disabled="kk.disabled")

    table.table
      tr
        td Имя кассы
        td: b-form-input(:rows="3" v-model="kk.name" placeholder="Касса 1") 
      tr
        td Заводской номер
        td
          h5 {{kk.znk}}
            i.fa.fa-save.ml-2(title="Скачать пасспорт")
      tr
        td Регистрационный номер
        td: b-input-group
              b-form-input(v-model="kk.legal.rnk")
              b-input-group-addon от
              b-form-input(Ztype="date" v-model="kk.legal.rnk_date")
      tr
        td: i  Идентификационный номер
        td: b-form-input(v-model="kk.legal.ink")
  p {{kk}}

  b-row.mb-4
    b-col(cols="4")
    b-col
      b-button(@click="toggleKKM" :disabled="kkms.length == 1" :variant="kk&&kk.disabled?'light':'warning'") 
        | {{kk&&kk.disabled?'Вкл':'Выкл'}}
      b-button.ml-2(@click="deleteKKM(kk)" :disabled="kkms.length == 1" variant="danger") Удалить

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'KKMSettings',
  props:['group','config','kkm'],
  computed:{
    kkms(){
      return this.group.kassa.kkms;
    }
  },
  mounted(){
    if(this.kkm && this.kkm.znk)
      this.kk = this.kkm
  },
  data () {
    return {
      kk: {
        znk:"KKM",
        name:"Касса",
        disabled:false,
        legal:{
          ink:"",
          rnk:"",
          rnk_date:""
        }
      }
    }
  },
  methods:{
    createKKM(){
      console.log('createKKM');
      this.reset()
      this.kk.name += this.kkms.length
      this.kk.znk += this.group.code_.toUpperCase() + this.kkms.length
      this.group.kassa.kkms.push(this.kk);
      this.$emit('change')
    },
    selectKKM(item){
      this.kk = item
      this.$("#settingsForm").reset();
    },
    toggleKKM(){
      console.log('toggleKKM',this.kk.disabled);
      this.kk.disabled = !this.kk.disabled
      this.$emit('change')
    },
    deleteKKM(item){
      this.$ArrayRemoveElement(this.group.kassa.kkms,item);
      this.kk = this.group.kassa.kkms[this.group.kassa.kkms.length - 1]
    },
    change(){
      console.log('onCHnage');
    },
    reset(){
      this.$resetData()
      this.$("#settingsForm").reset();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
 
</style>