var DataStore = require('../store');
var store = DataStore.default

const getInstansi = () => {
  fetch(store.state.url.URL_Master_Agenda + "instansi", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
  })
      .then(res => res.json())
      .then(res_data => {
      console.log(res_data)
      store.state.list_instansi = res_data
  });
}


const getUnitKerja = (instansi) => {

  fetch(store.state.url.URL_Master_Agenda + "unit_kerja", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      instansi: instansi
    })
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_unit_kerja = res_data
  });
}

const getBiodata = (sub_unit_kerja) => {
  // console.log(kecamatan)
  fetch(store.state.url.URL_simpeg_biodata + "list", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: "kikensbatara " + localStorage.token
    },
    body: JSON.stringify({
      unit_kerja: sub_unit_kerja
    })
  })
      .then(res => res.json())
      .then(res_data => {
      store.state.list_biodata = res_data
      // console.log(res_data)
  });
}




module.exports = {
  getInstansi : getInstansi,
  getUnitKerja : getUnitKerja,
  getBiodata : getBiodata,
}