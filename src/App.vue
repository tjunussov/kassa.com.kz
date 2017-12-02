<template lang="pug">
doctype html

#app(v-if="inited")
  header.header.clearfix
    b-container
      b-navbar(toggleable="md")

        b-nav-toggle(target="nav_collapse")

        b-navbar-brand(to="/home")
          i.fa.fa-building.text-muted

        b-collapse(is-nav id="nav_collapse")

          b-navbar-nav
            b-dropdown.splitted.dropdown-autowidth(v-if="group" right variant="light")
              template(slot="button-content")
                .Lcompany
                  .h4 {{group.name}}
                  .Lsubcompany(if="group.kassa.legal.name != group.name") {{group.kassa.legal.name}} - {{currentKKM.name}}
              template(v-for="g in groups")
                b-dropdown-header {{g.name}}
                b-dropdown-item(
                  v-for="(k,index) in g.kassa.kkms" 
                  :key="k.name" 
                  @click="switchKKM({groupIndex:g.uuid,kkmIndex:index})",
                  :disabled="k.disabled"
                  :class="{'font-weight-bold':index == config.currentKKMIndex }") {{k.name}}


              b-dropdown-divider
              b-dropdown-item(to="/settings/org") 
                .fa.fa-gear.mr-1/  Управление


            //- b-dropdown.splitted(right split variant="light")
            //-   template(slot="button-content") 
            //-     .h3(v-b-modal.modalProfile) {{group.name}}
            //-   b-dropdown-header KKM
            //-   b-dropdown-item(v-for="k in group.kassa.kkms" :key="k.name" to="/settings/kkm") {{k.name}}
            //-   b-dropdown-divider
            //-   b-dropdown-item(to="/settings/kkm") 
            //-     .fa.fa-gear.mr-1/  Управление

          //- b-nav(is-nav-bar)
          //-   b-nav-item(to="/kassa") Касса
          //-   b-nav-item(to="/sales") Книга

          b-navbar-nav.ml-auto


            b-nav-item(to="/kassa/menu" v-b-tooltip.hover.auto title="Касса")
              .fa.fa-calculator.mr-1

            b-nav-item(to="/sales" v-b-tooltip.hover.auto title="История платежей")
              .fa.fa-list.mr-1

            //- b-nav-item(to="/inbox" v-b-tooltip.hover.auto title="Сообщения")
            //-   .fa.fa-comments.mr-1
            //-   b-badge(pill variant="success") 3

            b-nav-item(to="/contacts" v-b-tooltip.hover.auto title="Контакты")
              .fa.fa-user-circle-o.mr-1

            b-nav-form.ml-4

            //- b-nav-form.ml-2
            //-   b-form-input.mr-sm-2#appSearch(Zsize="lg" v-model="ui.search" placeholder="Поиск ...")


            b-nav-item-dropdown(right v-if="currentUserKey && group")
              template(slot="button-content")
                .fa.fa-user.mr-2.text-success
                span(:title="auth?auth.ssl_sdn:'Пользователь'") {{currentUserKey | shortFio}} 
              b-dropdown-item(to="/profile") Профиль
              b-dropdown-item(to="/audit" v-if="isAdmin") Аудит
              b-dropdown-item(to="/settings" v-if="isAdmin") Настройки
              b-dropdown-divider
              b-dropdown-header Войти как
              b-dropdown-item(@click="loginAs({key:k,val:v})" v-for="(v, k, index) in group.security.users" :key="k" :disabled="currentUserKey == k") 
                | {{k | shortFio}}
                i.fa.fa-lock.ml-2(v-if="v.pin")/
              b-dropdown-divider
              b-dropdown-item(to="/logout") Выйти

            b-nav-item(v-else @click="ui.showModalLogin = true") Войти

      //- nav
      //-   b-nav.float-right(pills)

  main(role='main')
    b-container
      //- keep-alive
      router-view
  
  b-container.pt-1
    footer.footer.mt-2
      b-row 
        b-col
          small.text-muted &copy; 2017 Облачная Касса Inc.
          b-badge.ml-2(pill :variant="online?'success':'secondary'") {{ online ? 'Online' : 'Offline' }} 
        b-col.text-right.text-muted
          small
            router-link(to="/support") Поддержка
            |  | 
            router-link(to="/about") Инфо

  ModalLogin(v-model="ui.showModalLogin")

  //- b-popover(target="appSearch"
  //-            triggers="focus"
  //-            placement="bottom"
  //-            ref="searchPopover")
  //-   div(v-if="ui.search")
  //-     h6.text-info.my-1 Результаты Поиска
  //-     b-list-group
  //-       b-list-group-item(href="#") Контакт +7 777 900 5000 Тимур
  //-       b-list-group-item(href="#") Чек #25646 Халва на 5000 тг 
  //-       b-list-group-item(href="#") Товар Халва Слоенная 200тг за 1 кг
  //-   div(v-else) Начните печатать чек или контакт или товар

  //- b-modal#modalProfile(ref="modalProfile" :lazy="true" :ok-only="true")
  //-   div(slot="modal-title")
  //-     | {{group.kassa.legal.name}}
      
  //-   table.table
  //-   tbody
  //-     tr
  //-       td БИН\ИИН
  //-       td {{group.kassa.legal.bin}}
  //-     tr
  //-       td Юридический адрес
  //-       td {{group.kassa.legal.address}}
  //-     tr
  //-       td Плательщик НДС
  //-       td {{group.kassa.legal.nds}}
  //-   div.w-100(slot="modal-footer")
  //-     b-btn.float-left(variant="light" @click="$refs.modalProfile.hide()" to="/settings/org") Редактировать
  //-     b-btn.float-right(variant="primary" @click="$refs.modalProfile.hide()") Ok


  //- b-modal#modalLibrary(
  //-   title="Позиции"
  //-   size="lg"
  //-   no-fade)
  //-   h4 Товары и Услуги

  //- b-modal#modalContact(
  //-   title="Контакт Анна Федтовоа"
  //-   size="lg"
  //-   no-fade)
  //-   h4 Информация



 
      //- b-btn.ml-2(variant="primary") Продажа
      //- b-button-group.float-right
      //-   b-btn: .fa.fa-comments   
      //-   b-btn: .fa.fa-envelope   
      //-   b-btn: .fa.fa-print 
b-container(v-else) 
  .text-center.text-muted Hydrating ... 

</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import ModalLogin from '@/components/utils/ModalLogin'

export default {
  name: 'app',
  data(){
    return {
      isLoginError:null,
      ui:{
        search:null,
        showModalLogin:false
      }
    }
  },
  computed:{
    ...mapGetters({
        group: 'getGroupSelected',
        hydrated:'hydrated',
        inited:'inited',
        groups: 'getGroup',
        config: 'getConfigSelected',
        configList: 'getConfig',
        currentKKM: 'currentKKM',
        currentUserKey: 'currentUserKey',
        isAdmin: 'isAdmin',
        auth: 'authorization'
    }),
    online(){
      return this.$root.online
    }
  },
  watch:{ 
    hydrated(val){ // watching callback for hydration finish
      if(val) this.storeInit(this.$db) // Initing VUEX Store
    }
  },
  created(){
    // Populating VUEX Store, on before render
    this.storePopulate(this.$db)
  },
  components: {
    ModalLogin
  },
  methods:{
    ...mapActions([
      'configSelect',
      'configUpdate',
      'groupSelect',
      'switchKKM',
      'switchUser',
      'switchGroup',
      'storeInit',
      'storePopulate'
    ]),
    loginAs(p){
      if(p.val.pin) this.ui.showModalLogin = p.val
      else this.switchUser(p)
    }
  }
}
</script>

<style lang="stylus" src="./AppGlobal.styl"></style>
<style lang="stylus" src="./App.styl"></style>
