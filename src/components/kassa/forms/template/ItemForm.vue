<template lang="pug">
doctype html
div

  b-row
    b-col
      slot
    b-col.text-right
      h6.mt-4 {{item.type_}} - {{item.created_ | date}}

  b-form.p-3(v-if="item")

    b-form-group(label="SKU" horizontal)
      b-form-input(v-model="item.sku")

    b-form-group(label="Наименование" horizontal)
      b-form-input(v-model="item.name")

    b-form-group(label="Цена" horizontal)
      b-form-input(v-model.number="item.price")

    hr

    b-form-group(label="Кол-во" horizontal)
      div(v-if="inventory" slot="description") Остаток {{inventory}} шт
      b-input-group
        b-input-group-button: b-btn(@click="decQuantity") -
        b-input-group-button: b-btn(@click="incQuantity") +
        b-form-input(type="number" min="1" v-model.number="item.quantity")
        b-input-group-button: b-btn(@click="setQuantity") 1
        b-input-group-button: b-btn(@click="setQuantity") 2
        b-input-group-button: b-btn(@click="setQuantity") 3
        b-input-group-button: b-btn(@click="setQuantity") 4
        b-input-group-button: b-btn(@click="setQuantity") 5
        b-input-group-button: b-btn(@click="setQuantity") 6

    b-form-group(:label="isDiscount?'Скидка':'Наценка'" horizontal)
      b-input-group
        b-input-group-addon(@click="isDiscount=!isDiscount") {{isDiscount?'-':'+'}}
        b-form-input(type="number" v-model.number="item.discount")
        b-input-group-addon %
        b-input-group-button: b-btn(@click="setDiscount") 0
        b-input-group-button: b-btn(@click="setDiscount") 5
        b-input-group-button: b-btn(@click="setDiscount") 10
        b-input-group-button: b-btn(@click="setDiscount") 15
        b-input-group-button: b-btn(@click="setDiscount") 20

    b-form-group(label="Сумма" horizontal)
      b-form-input(readonly :value="item.amount")

  .small {{item}}

</template>

<script>

export default {
  name: 'itemForm',
  props:['item'],
  data () {
    return {
      isDiscount:true,
    }
  },
  watch:{
    isDiscount(val){
      this.item.discount = (val?-1:1)*Math.abs(this.item.discount)
    }
  },
  computed: {
    /*amount(){
      var a = this.item.price * this.item.quantity * ( 1 + this.item.discount*(this.isDiscount?-1:1)/100)
      this.item.amount = a
      return a
    },*/
    inventory(){
      if(this.item.inventory) 
        return this.item.inventory - this.item.quantity
      else
        return false
    }
  },
  mounted(){
    console.log('itemForm mounted');
  },
  components:{
    
  },
  methods:{
    incQuantity(){
      this.item.quantity++
    },
    decQuantity(){
      this.item.quantity--
    },
    setQuantity(e){
      console.log('quantity',e.target.innerText)
      this.item.quantity = Number(e.target.innerText)
    },
    setDiscount(e){
      console.log('discount',e.target.innerText)
      this.item.discount = (this.isDiscount?-1:1)*Number(e.target.innerText)
    }

  }
}
</script>

<style lang="stylus">
// .counts .btn
//   padding 0.8rem 1.5rem
//   font-size 2rem
  

  
</style>
