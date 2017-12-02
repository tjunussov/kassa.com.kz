import shop from '@/store/api/shop'
import * as types from '@/store/types'
import { uuid } from 'vue-idb'
import { obfuscate, ArrayRemoveElement, ArrayClone } from '@/misc/utils'


// export default (db) => {


  var PAY_LIST_DEFAULT = [];

  const state = {
    buyList:[],
    payList:[],
    itemSelected:{
      name:null,
      amount:null,
      discount:0,
      type_:"product",
      quantity:1,
      price:null,
      ui:{ disabled: false, manualEnter:true }
    },
    receipt:null,
    saleSeq:Number(localStorage.getItem('saleSeq'))||1,
    checkoutStatus: null,
    fiscalStatus:null,
    payerContact:null,
  }

  // getters
  const getters = {
    buyList : state => state.buyList,
    payList : state => state.payList,
    saleSeq: state => state.saleSeq,
    getCartItemSelected: state => state.itemSelected,
    checkoutStatus: state => state.checkoutStatus,
    fiscalStatus: state => state.fiscalStatus,
    payerContact : state => state.payerContact,
    getReceipt: state => state.receipt,
    buyTotal(state){

      if(!state.buyList) {
        return 0
      }
      return state.buyList.reduce(function (a, b) {
        if(b.ui.disabled) 
          return a
        else
          return a + b.amount
      }, 0);
    },
    payTotal(state,getters){
      if(!state.payList) return 0

      // autoCalc Cash amount ( including Card Payment ) 
      if(state.payList && state.payList[0] && state.payList[0].ui && !state.payList[0].ui.manualEnter){
        var dif = getters.buyTotal - (state.payList[1]?state.payList[1].amount:0)
        // console.log('syncPaymentAmount 2 ',dif, total, cardAmount);
        if(dif >= 0){
          // console.log('syncPaymentAmount 3', dif);
          state.payList[0].amount = dif
        } else {
          state.payList[0].amount = 0
        }
      }

      return state.payList.reduce(function (a, b) {
        if(b.ui.disabled) 
          return a
        else
          return a + b.amount
      }, 0);
    },
    excess: (state,getters) => { 
      return getters.payTotal - getters.buyTotal
    }
  }


    

  // actions
  const actions = {
    checkout ({ commit, dispatch, state, getters }) {
      // const savedCartItems = [...state.buyList]
      // commit(types.CHECKOUT_REQUEST)

      var cart = {
        uuid: uuid(),
        no:state.saleSeq,
        cmd:"SALE",
        meta_:{ 
          created:new Date(),
          accounted:new Date(),
          code: obfuscate(state.saleSeq),
          owner:getters.currentUserKey
        },        
        buyList:{
          total:getters.buyTotal,
          contact:getters.buyerContact,
          items:removeUIData(state.buyList)
        },
        payList:{
          total:getters.payTotal,
          excess:getters.excess,
          contact:state.payerContact,
          items:removeUIData(state.payList)
        },
        app: { 
          fiscal: { 
            znk:getters.currentKKM.znk, 
            rnk:getters.currentKKM.legal.rnk  
            }
          }
      };

      // TODO Rewrite to Promise Chain
      dispatch('salesAdd',cart).then(()=>{

        commit(types.CHECKOUT_CART, cart)
        commit(types.SALE_SEQ_INCREMENT)
        commit(types.FISCALIZE_PENDING)

        dispatch('fiscalize',cart).then((fiscal)=>{
          var crt = Object.assign({}, cart, { 
            app: { 
              fiscal: { ...fiscal}
            } 
          }) // Vue caveate

          commit(types.FISCALIZE_SUCCESS)

          // Updating again sale with fiscal reply
          dispatch('salesUpdate',crt).then(()=>{
            commit(types.CHECKOUT_UPDATE_CART, crt)  
          })
          // return dispatch('salesAdd',cart).then(()=>{
          //   commit(types.SALE_SEQ_INCREMENT)
          //   return cart
          // })
          
        }).catch((fiscal)=>{
          commit(types.FISCALIZE_FAILURE)
          var crt = Object.assign({}, cart, { 
            app: { 
              fiscal: { ...fiscal}
            } 
          }) // Vue caveate

          // Updating again sale with fiscal reply
          dispatch('salesUpdate',crt).then(()=>{
            commit(types.CHECKOUT_UPDATE_CART, crt)  
          })

        })
      })

      return Promise.resolve(cart)

      // shop.checkout(
      //   items,
      //   () => commit(types.CHECKOUT_SUCCESS),
      //   () => commit(types.CHECKOUT_FAILURE, { savedCartItems })
      // )
    },
    fiscalize ({commit}, cart) {
      return shop.fiscalize(cart)
        // .then((d) => commit(types.FISCALIZE_SUCCESS),d)
        // .catch(() => commit(types.FISCALIZE_FAILURE, { cart }));
    },
    saleSeqIncrement ({commit}) {
      commit(types.SALE_SEQ_INCREMENT)
    },
    addToCart ({ commit }, item) {
      commit(types.ADD_TO_CART, item)
    },
    removeFromCart ({ commit }, item) {
      commit(types.REMOVE_FROM_CART, item)
    },
    addPaymentToCart ({ commit }, item) {
      commit(types.ADD_PAYMENT_TO_CART, item)
    },
    removePaymentFromCart ({ commit }, item) {
      commit(types.REMOVE_PAYMENT_FROM_CART, item)
    },
    resetCart({ commit }) {
      commit(types.RESET_CART)
    },
    setPayerContact({ commit },contact) {
      commit(types.SET_PAYER_CONTACT,contact)
    },
    initCart ({commit}, db) {
      db.items.where('type_').equalsIgnoreCase("money").sortBy("meta_.basket").then(r=>{
        commit(types.FETCH_DEFAULT_PAYMENTS,r)
      }).then(()=>{
        // For DEBUG load 2 items automaticaly
        db.items.where('type_').equalsIgnoreCase("product").limit(2).toArray().then(r=>{
        //db.items.limit(2).toArray().then(r=>{
          commit(types.FETCH_DEMO_ITEMS,r)
        });
      });
    },
    // async actionA ({ commit }) {
    //   commit('gotData', await getData())
    // },
    // async actionB ({ dispatch, commit }) {
    //   await dispatch('actionA') // wait for actionA to finish
    //   commit('gotOtherData', await getOtherData())
    // }
  }

  // mutations
  const mutations = {

    [types.SALE_SEQ_INCREMENT] (state) {
      state.saleSeq++
      localStorage.setItem('saleSeq',state.saleSeq)
    },

    [types.ADD_TO_CART] (state, item) {
      state.checkoutStatus = null
      const record = state.buyList.find(p => p.name === item.name)
      if (!record) {
        state.buyList.push(
          addUIData(item)
        )
      } else {
        record.quantity++ 
      }
    },

    [types.ADD_PAYMENT_TO_CART] (state, item) {
      state.checkoutStatus = null
      state.payList.push(
        addUIData(item)
      )
    },

    [types.REMOVE_FROM_CART] (state, item) {
      ArrayRemoveElement(state.buyList,item);
    },

    [types.REMOVE_PAYMENT_FROM_CART] (state, item) {
      ArrayRemoveElement(state.payList,item);
    },

    [types.FISCALIZE_PENDING] (state) {
      state.fiscalStatus = "pending"
    },
    [types.FISCALIZE_SUCCESS] (state) {
      state.fiscalStatus = "success"
    },
    [types.FISCALIZE_FAILURE] (state, item) {
      state.fiscalStatus = "error"
    },
    [types.CHECKOUT_CART] (state, cart) {
      state.receipt = cart
    },
    [types.CHECKOUT_UPDATE_CART] (state, cart) {
      state.receipt = cart
      console.log('CHECKOUT_UPDATE_CART',cart);
    },


    [types.SET_PAYER_CONTACT] (state, item) {
      state.payerContact = item;
    },

    [types.RESET_CART] (state) {
      state.buyList = []
      state.payList = ArrayClone(PAY_LIST_DEFAULT) // patching
      state.checkoutStatus = null
      state.payerContact = null
    },

    [types.CHECKOUT_REQUEST] (state) {
      // clear cart
      state.buyList = []
      state.checkoutStatus = null
    },

    [types.CHECKOUT_SUCCESS] (state) {
      state.checkoutStatus = 'successful'
    },

    [types.CHECKOUT_FAILURE] (state, { savedCartItems }) {
      // rollback to the cart saved before sending the request
      state.buyList = savedCartItems
      state.checkoutStatus = 'failed'
    },

    [types.FETCH_DEMO_ITEMS] (state,r) {
       state.buyList = r.map((c,i)=>{
        c.quantity = 1
        c.amount = c.price
        c.discount = 0
        c.ui = { disabled:false, manualEnter:false }
        // this.add(c)
        return c
      });
    },

    [types.FETCH_DEFAULT_PAYMENTS] (state,r) {
      state.payList = r.map((c,i)=>{
        c.amount = 0
        c.ui = { disabled:false, manualEnter:false, locked:false }
        return c
      });
      PAY_LIST_DEFAULT = ArrayClone(state.payList) //this.listPayments.slice(0) // cloning and caching
      // console.log('PAY_LIST_DEFAULT',PAY_LIST_DEFAULT);
    },
  }

  // return {

export default {
    state,
    getters,
    actions,
    mutations
  }
// }

function removeUIData(l){
  return l.reduce((a, b)=>{
    if(!b.ui.disabled && b.amount > 0){
      delete b.ui
      a.push(Object.assign({},b)) // ?? WHY I CLONE THIS
    }
    return a
  },[]);
}

function addUIData(i) {
  if(i) {
    i = Object.assign({},i)
  }
  if(!i.ui) i.ui = { disabled:false, manualEnter:false, locked:false }
  if(!i.name) i.name = "Позиция"
  if(!i.discount) i.discount = 0
  if(!i.amount && i.price) i.amount = i.price
  if(!i.price && i.amount) i.price = i.amount
  if(!i.quantity) i.quantity = 1
  if(!i.type_) i.type_ = "product"

  return i
}
/*
function _syncCashPaymentAmount(payList, total, cardAmount){
  // console.log('syncPaymentAmount',payList[0]);
  if(payList && payList[0] && payList[0].ui && !payList[0].ui.manualEnter){
    var dif = total - cardAmount
    // console.log('syncPaymentAmount 2 ',dif, total, cardAmount);
    if(dif >= 0){
      // console.log('syncPaymentAmount 3', dif);
      payList[0].amount = dif
    } else {
      payList[0].amount = 0
    }
  }
}*/