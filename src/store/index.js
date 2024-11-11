import { createStore } from 'vuex'

import { Loading, QSpinnerBall } from 'quasar'

var URL = 'http://localhost:5001/';
// var URL = 'https://server-egov.konaweselatankab.go.id/'

const store = createStore({
  state: {
    url : {
      URL_APP : URL,
      URL_simpeg_biodata : URL+'api/v1/simpeg_biodata/',
      URL_simpeg_unit_kerja: URL+'api/v1/simpeg_unit_kerja/',
      URL_simpeg_instansi : URL+'api/v1/simpeg_instansi/',

      URL_Master_Agenda : URL+'api/v1/eagenda_master/',

      URL_DM_REGISTER : URL+'api/v1/eagenda_dm_registrasi/',
      URL_DM_MENU : URL+'api/v1/eagenda_dm_menuList/',
      URL_DM_KLP_USERS : URL+'api/v1/eagenda_dm_kelompokUsers/',
      checkAuth : URL + 'api/v1/checkAuth/',

      URL_Agenda : URL + 'api/v1/eagenda_agenda/',
    },
    
    list_unit_kerja: [],
    list_instansi: [],

    list_menu : null,
    aksesMenu : {},

    type : [
      {id : 0, uraian : 'Single Menu'},
      {id : 1, uraian : 'Multy Menu'}
    ],
  },
  getters: {
  },
  mutations: {
    getStorage(state){
      var get_profile = JSON.parse(localStorage.profile);
      state.unit_kerja = get_profile.profile.unit_kerja; 
    },
    showLoading(){
      Loading.show({
        spinner : QSpinnerBall,
        spinnerColor: 'cyan-10',
        spinnerSize: 140,
        backgroundColor: 'grey-2',
        // message: 'Loading... Tunggu beberapa saat, system sedang menyesuaikan akun anda..!',
        // messageColor: 'white'
      })
    },
    hideLoading(){
      Loading.hide()
    },

  },
  actions: {
  },
  modules: {
  }
})

export default store;