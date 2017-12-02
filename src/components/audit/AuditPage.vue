<template lang="pug">
div.audit.mb-4
  h4 Аудит
  b-table.mt-4(striped hover :items="audits")
  //- p {{a}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'auditPage',
  data () {
    return {
      sort: null,
      handleScroll: null,
      now: new Date(),
      audits:[]
    }
  },
  mounted(){
    console.log(this.$options.name,'mounted');
    this.auditByDate()
  },
  computed:{
    ...mapGetters({
        a: 'getAudit',
    })
  },
  methods:{
    auditByDate(){

      var from = new Date(this.now)
      from.setHours(0);
      from.setMinutes(0);
      from.setSeconds(0);

      var to = new Date(from);
      to.setDate(to.getDate() + 1);

      this.$db.audit.where('meta_.created').between(from,to).reverse().toArray((a)=>{
        this.audits = a
        // console.log('sales',this.sales);
      });
    }
  }
}
</script>

<style lang="stylus">
  

.container{
  overflow: visible;
}
  
</style>

