<template lang="pug">
doctype html
div
  
  slot

  b-form.p-3

    template(v-for="p in payments")

      //- b-form-group(v-if="p.item.name == 'Наличные'")
        b-button-group.d-flex
          b-btn.w-100(v-for="s in subtypes(p)" :key="s" @click="setAmount(s)") {{s | money}} ₸

      b-form-group(:label="p.item.name" :label-cols="4" horizontal)
        b-input-group
          b-input-group-addon ₸
          b-form-input.text-right(v-model.number="p.item.amount")
          b-input-group-button(slot="right") 
            b-button(variant="primary") Оплатить

      hr/

    b-form-group(label="" :label-cols="4" horizontal)
      b-button(variant="light" block) Другие методы оплаты ...

    hr/

    //- b-form-group(label="SKU" horizontal)
    //-   b-form-input(readonly v-model="item.item.sku")

    

    //- b-form-group(label="Кол-во" horizontal)
    //-   b-input-group
    //-     b-form-input(type="number" min="1" v-model.number="item.item.count")
    //-     b-input-group-button
    //-         b-btn(@click="setCount") 1
    //-     b-input-group-button
    //-         b-btn(@click="setCount") 2

    //- b-form-group(label="Скидка" horizontal)
    //-   b-input-group
    //-     b-form-input(type="number" v-model.number="item.item.discount")
    //-     b-input-group-addon %

  .small {{item}}

</template>

<script>

export default {
  name: 'tenderForm',
  props:['item','listPayments'],
  data () {
    return {
      payments:[],
    }
  },
  computed:{
    subtypes(p){
      console.log(p);
      var a = p.item.amount
      return [Math.round(a/100)*100,1000,1500,2000,5000,10000]
    }
  },
  created(){
    if(this.item) 
      this.payments.push(this.item)
    else if(this.listPayments)
      this.payments = this.listPayments
  },
  components:{
    
  },
  methods:{
    setCount(e){
      console.log('disounct amount',e.target.innerText)
      this.item.item.count = Number(e.target.innerText)
    },
    setAmount(a){
      this.item.item.amount = a
    }
    
  }
}
</script>

<style lang="stylus">
      
  
</style>
