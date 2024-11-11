<template>
    <q-list>
      <q-img src="img/krad.png" style="width: 100%">
    </q-img>

    <q-item-label class="bg-cyan-8" header><span style="color:white">{{profile.nama}}</span></q-item-label>

    <template v-for="(data, index) in $store.state.list_menu">

    <q-item v-if="!checkLength(data.subItem)" clickable :to="data.route" exact :key="data.index">
      <q-item-section top avatar>
        <span style="display:none">{{index}}</span>
        <q-avatar :color="data.color" text-color="white" :icon="data.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="h_sidebar_menu">{{data.title}}</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item  v-if="checkLength(data.subItem)" :key="data.index">
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar :icon="data.icon" :color="data.color" text-color="white" />
        </q-item-section>
        <q-item-section class="h_sidebar_menu">{{data.title}}</q-item-section>
      </template>
      <q-list bordered>

        <template v-for="(data1, index1) in data.subItem">

          <q-item v-if="!checkLength(data1.subItem)" clickable :to="data1.route" :key="index1">
            <q-item-section avatar>
            </q-item-section>
            <q-item-section class="h_sidebar_sub_menu">{{data1.title}}</q-item-section>
          </q-item>


          <q-expansion-item :key="index1" v-if="checkLength(data1.subItem)"
            class="h_sidebar_sub_menu"
            expand-separator
            :content-inset-level="1"
          >

            <template v-slot:header>
              <q-item-section avatar>
                <q-avatar icon="radio_button_checked"  text-color="#2d2c2c" />
              </q-item-section>
              <q-item-section class="h_sidebar_menu">{{data1.title}}</q-item-section>
            </template>


              <q-list v-for="(data2, index2) in data1.subItem" :key="index2">
                  <q-item clickable :to="data2.route">
                      <q-item-section class="h_sidebar_sub_menu">{{data2.title}}</q-item-section>
                  </q-item>
              </q-list>
          </q-expansion-item>

        </template>


      </q-list>
    </q-expansion-item>


</template>

    <q-item clickable @click="logout" exact>
      <q-item-section top avatar>
        <q-avatar color="red-7" text-color="white" icon="exit_to_app" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Keluar</q-item-label>
        <q-item-label caption lines="2">Logout</q-item-label>
      </q-item-section>
    </q-item>
      </q-list>
</template>

<script>

import FETCHING from "../library/fetching";
import UMUM from "../library/umum";

export default {
  data() {
    return {
      profile : {
					nama : '',
					unit_kerja : '',
          unitKerja : '',
				},
        
      list_data : [],
      FETCHING : FETCHING,
      UMUM : UMUM,
    };
  },

  methods: {
    logout : function(){
        localStorage.removeItem('token');
        localStorage.removeItem('profile');
        this.$router.push('/login');
    },

    checkLength(data){
      if (data.length <= 0) {
        return false
      } else {
        return true        
      }
    },

    async loadMenu(){

      var get_profile = JSON.parse(localStorage.profile);
      var profileku = get_profile.profile;
      var dataMenu =await this.FETCHING.postMasterMenuGetSideBar(profileku.eagenda)

      this.$store.state.list_menu = dataMenu

      var data = []
      dataMenu.forEach(h => {
          if (h.type == 0) {
            data.push(h)
          } else {
            h.subItem.forEach(i => {
                if (i.type == 0) {
                  data.push(i)
                } else {
                  i.subItem.forEach(j => {
                      data.push(j)
                  });
                }
            });
          }
      });
      var obj = UMUM.ArrToObj(data)
      this.$store.state.aksesMenu = obj
    },

  },
  mounted: function(){
    var get_profile = JSON.parse(localStorage.profile);

    console.log(get_profile);
    // this.profile.unit_kerja = get_profile.profile.unit_kerja_nama;
    this.profile.nama = get_profile.profile.nama;
    // this.profile.unitKerja = get_profile.profile.unit_kerja_id;
    this.loadMenu();
  },
  
};
</script>