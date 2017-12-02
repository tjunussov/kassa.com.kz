<template lang="pug">
div
 
  h4 Пользователи
  p Установка кассы совершается путем настройки системы

  b-form-row.mb-4
    b-col
      .my-2 Кассиры
      b-form-group
        b-input-group
          b-input-group-addon PIN
          b-form-input(type="password" v-model="group.security.usersDefaultPIN" placeholder="Пароль для кассиров")
      b-form-textarea(:rows="5" :value="users" placeholder="Список кассиров")
    b-col
      .my-2 Администраторы
      b-form-group
        b-input-group
          b-input-group-addon PIN
          b-form-input(type="password" v-model="group.security.adminsDefaultPIN" placeholder="Пароль для администратора")
      b-form-textarea(:rows="5" placeholder="Администраторы ... " :value="admins")
  table.table
    tr(v-for="(value,key,index) in group.security.users")
      td: b-form-input(v-model="key")
      td: b-form-input(v-model="value.pin")
        
  b-form-group(label="Анонимный вход")
    b-form-checkbox(v-model="group.security.anonymousLogin")

</template>

<script>
export default {
  name: 'UserSettings',
  props:['group','config','kkm'],
  computed:{
    users(){
      return Object.keys(this.group.security.users).join("\n")
    },
    admins(){
      return Object.entries(this.group.security.users).reduce((n, b)=>{ 
        if(b[1].role && b[1].role == "admin") n.push(b[0])
        return n
      },[]).join("\n")
    }
  },
  data () {
    return {
       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
</style>