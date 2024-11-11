<template>
  <q-layout view="lHh lpr fFf">
    <q-header elevated class="bg-cyan-10" v-if="!checkLogin">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          Elektronik Agenda Kabupaten Konawe Selatan
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2" v-if="!checkLogin">
      <SideBar/>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import SideBar from './components/SideBar.vue';

export default {
  name: 'LayoutDefault',

  components: {
    SideBar
  },

  data () {
    return {
      leftDrawerOpen: ref(false)
    }
  },

  computed: {
      checkLogin() {
          if (this.$route.name === 'Login') {
              return true;
          } else {
              return false;
          }
      }
  },

}
</script>
