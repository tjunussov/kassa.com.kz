<template lang="pug">
doctype html
b-row.settings.mb-4
  b-col(:cols="8")
    form#settingsForm(@change="ui.changed = true")
      router-view(v-bind="{group,kkm,kassa,config}" @change="ui.changed = true" @update="updateAll")


      b-row.mb-4
        b-col(cols="4")
        b-col
          b-btn.mr-2(variant="primary" :disabled="!ui.changed" @click="updateAll") Сохранить 
          //- b-btn Отмена



  b-col(:cols="4")
    b-button(variant="link" to="/settings") 
      h5.mb-3 Настройки
    b-list-group(Zv-b-scrollspy:listgroup-ex)
      b-list-group-item(to="/settings/kkm") Кассовый Аппарат
      b-list-group-item(to="/settings/ui") Интерфейс
      b-list-group-item(to="/settings/devices/printer/check") Чеки
      b-list-group-item(to="/settings/payments/plan") Тарифный План 
        small(Zv-if="s.plan") 
          //- b-badge(pill variant="dark") {{group.plan}}
      //- b-list-group-item(to="/settings/devices") Устройства

    b-button(variant="link" to="/settings/org") 
      h5.my-3 Организация
    b-list-group
      b-list-group-item(to="/settings/users") Пользователи
      //- b-list-group-item(to="/settings/groups" disabled) Филиалы

    
    b-button(variant="link" to="/settings/apps") 
      h5.my-3 Apps
    b-list-group
      //- b-list-group-item(to="ofd") Касса
      //- b-list-group-item(to="ofd") Контакты
      //- b-list-group-item(to="ofd") Календарь
      //- b-list-group-item(to="ofd") Заказы
      //- b-list-group-item(to="ofd") 
      b-list-group-item(v-for="a in apps" :key="a.name" :to="'/settings/apps/'+a.name") {{a.name}} 
        small: b-badge(pill variant="danger") {{a.message}}


</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settingPage',
  data(){
    return {
      ui:{ changed:false }
    }
  },
  computed: {
    ...mapGetters({
        group: 'getGroupSelected',
        config: 'getConfigSelected',
        apps: 'getApp',
        kkm:'currentKKM',
        kassa:'currentKassa'
    })
  },
  mounted(){
    
  },
  methods:{
    ...mapActions([
      'groupUpdate',
      'configUpdate',
      'appUpdate',
    ]),
    updateAll(){
      console.log('update all');
      this.groupUpdate(this.group)
      this.ui.changed = false
      // this.configUpdate(this.config)
      // this.appUpdate(this.apps)
    }
  }
}
</script>

<style lang="stylus">

  
</style>
