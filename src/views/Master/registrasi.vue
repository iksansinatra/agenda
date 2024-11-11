<template>
  <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
          <q-card-section class="bg-cyan-9 text-white">
              <div class="row">
                  <div class="col-12 col-md-8">
                      <div class="text-h5 h_titleHead">Verifikasi Agenda</div>
                  </div>
                  <div class="col-12 col-md-4">
                      <div class="row">
                      <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:100%"/>
                      </div>
                  </div>
              </div>
          </q-card-section>

          <q-card-section>
      <div class="row">
          <div class="col-12 col-md-6"  style="padding-left:0.5%; padding-right:0.5%">
          <span class="h_lable ">Unit Kerja</span>
          <div class="row">
            <model-list-select :list="$store.state.list_instansi"
             outlined square :dense="true"
             style="width:90%"
              class="inputbs inputfilter margin_btn bg-white"
              v-model="filterku.instansi"
              option-value="id"
              option-text="instansi"
              @input="DATA_MASTER.getUnitKerja(filterku.instansi), cari_data()"
               placeholder="Pilih Instansi">
            </model-list-select>
            <q-btn @click="filterku.instansi ='', filterku.unit_kerja ='', cari_data()" glossy class="bg-brown-5" dense flat icon="refresh" style="color : white; width:10% ; height : 38px">
                <q-tooltip content-class="bg-brown-5" content-style="font-size: 13px;">
                  Reset Instansi
                </q-tooltip>
            </q-btn>
          </div>


        </div>
        <!-- <div class="col-12 col-md-1"></div> -->
        <div class="col-12 col-md-6"  style="padding-left:0.5%; padding-right:0.5%">
          <span class="h_lable ">Sub Unit Kerja</span>
          <div class="row">
            <model-list-select :list="$store.state.list_unit_kerja"
             outlined square :dense="true"
             style="width:90%"
              class="inputbs inputfilter margin_btn bg-white"
              v-model="filterku.unit_kerja"
              option-value="id"
              option-text="unit_kerja"
              @input="cari_data()"
              placeholder="Pilih Instansi">
            </model-list-select>
            <q-btn @click="filterku.unit_kerja ='', cari_data()" glossy class="bg-brown-5" dense flat icon="refresh" style="color : white; width:10% ; height : 38px">
                <q-tooltip content-class="bg-brown-5" content-style="font-size: 13px;">
                  Reset Instansi
                </q-tooltip>
            </q-btn>
          </div>
        </div>
      </div>
    </q-card-section>

          <q-separator dark inset />

          <q-card-section>
              <hr class="hrpagin2">
              <div class="tbl_responsive">
                  <!-- =================================================== KONTENT =========================================================== -->
                  <table width="100%">
                      <tr class="h_table_head bg-light-blue-2">
                          <th width="5%" class="text-center">No</th>
                          <th width="20%">Nama/NIP</th>
                          <th width="25%">Unit Kerja</th>
                          <th width="25%">Keterangan</th>
                          <th width="25%">Waktu</th>
                          <th width="25%">Status</th>
                          <th width="10%"></th>
                      </tr>
                      <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id" :class="{'bg-lime-1': data.status === null, 'bg-cyan-1': data.status === 1, 'bg-red-1': data.status === 2}" >
                          <td class="text-center">{{ index+1 }}.</td>
                          <td>{{ data.nama_pegawai }} <br> <q-badge color="light-blue-5" class="q-mb-sm">{{data.nip_pegawai}}</q-badge></td>
                          <td>{{ data.unit_pegawai }}</td>
                          <td>{{ data.judul }}</td>
                          <td>{{ UMUM.tglConvert(data.tgl) }}<br> <q-badge color="light-blue-5" class="q-mb-sm">{{data.start}} - {{data.finish}}</q-badge></td>
                          <td>
                              <q-btn v-if="data.status == 2" glossy color="red-5" icon="event_busy" class="tbl_btn">
                                  <q-tooltip content-class="bg-red" content-style="font-size: 10px">
                                      Dibatalkan
                                  </q-tooltip>
                              </q-btn>
                              <q-btn v-if="data.status == 1" glossy color="cyan-5" icon="event_available" class="tbl_btn">
                                  <q-tooltip content-class="bg-cyan" content-style="font-size: 10px">
                                      Diagendakan
                                  </q-tooltip>
                              </q-btn>
                              <q-btn v-if="data.status == null" glossy color="lime-7" icon="pending" class="tbl_btn">
                                  <q-tooltip content-class="bg-lime" content-style="font-size: 10px">
                                      Proses Verifikasi
                                  </q-tooltip>
                              </q-btn>
                          </td>
                          <td class="text-center">
                              <q-btn-group>
                                  <q-btn @click="mdl_lihat = true, selectData(data)" glossy color="blue" icon="text_snippet" class="tbl_btn">
                                      <q-tooltip content-class="bg-blue" content-style="font-size: 10px">
                                          Lampiran
                                      </q-tooltip>
                                  </q-btn>
                                  <q-btn @click="mdl_forward = true, selectData(data)" glossy color="orange-7" icon="task" class="tbl_btn">
                                      <q-tooltip content-class="bg-orange" content-style="font-size: 10px">
                                          Verifikasi
                                      </q-tooltip>
                                  </q-btn>
                                  <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                      <q-tooltip content-class="bg-red" content-style="font-size: 10px">
                                          Hapus DAta
                                      </q-tooltip>
                                  </q-btn>
                              </q-btn-group>
                          </td>
                      </tr>
                  </table>
                  <!-- =================================================== KONTENT =========================================================== -->
              </div>
              <hr class="hrpagin">
              <br>
              <div class="text-center">
                  <q-btn @click="btn_prev" glossy color="cyan-8" icon="skip_previous" class="paginate_btn" />
                      <span class="h_panation">&nbsp; {{page_first}} - {{page_last}} &nbsp;</span>
                  <q-btn @click="btn_next" glossy color="cyan-8" icon="skip_next" class="paginate_btn" />
              </div>
              <br>
      </q-card-section>
      </q-card>

      <!-- =================================================== MODAL =========================================================== -->

      <!-- ================================================= MODAL VERIFIKASI ================================================ -->
      <q-dialog v-model="mdl_forward" persistent>
          <q-card class="mdl-md">
              <q-card-section class="bg-orange">
                  <div class="text-h6 h_modalhead">Verifikasi</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                  <br>
                  <div class="row">
                      <div class="col-12 col-md-12 frame_cari" style="padding-bottom: 7.5px;">
                          <span class="h_lable ">Keterangan</span>
                          <q-input v-model="form.keterangan" outlined square :dense="true" type="text" class="bg-white margin_btn"/>
                      </div>
                  </div>
              </q-card-section>

              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                  <q-btn :loading="btn_add" color="cyan-7" @click="agendakan()" label="Agendakan" />
                  <q-btn :loading="btn_add" color="red-7" @click="batalkan()" label="Batalkan" />
                  <q-btn label="Tutup" color="grey" v-close-popup />        
              </q-card-actions>

          </q-card>
      </q-dialog>
      <!-- ================================================= MODAL VERIFIKASI ================================================ -->

      <!-- ================================================ MODAL HAPUS ================================================ -->
      <q-dialog v-model="mdl_hapus" persistent>
          <q-card class="mdl-sm ">
              <q-card-section class="q-pt-none text-center orageGrad">
                  <form @submit.prevent="removeData(form.id, form.file_old)">
                      <br>
                      <img src="img/alert.png" alt="" width="75"> <br>
                      <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                      <input type="submit" style="position: absolute; left: -9999px"/>
                      <br><br>
                      <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                      &nbsp;
                      <q-btn type="submit" label="Hapus" size="sm" color="light-blue-9" v-close-popup/>
                  </form>
              </q-card-section>
          </q-card>
      </q-dialog>
      <!-- ================================================ MODAL HAPUS ================================================ -->

      <!-- ================================================= MODAL LIHAT ================================================ -->
      <q-dialog v-model="mdl_lihat" persistent>
          <q-card class="mdl-lg">

              <q-card-section class="bg-light-blue-8">
                  <div class="text-h6 h_modalhead">Lampiran</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                  <br>
                  <div class="text-center">
                      <embed :src="file_path+form.file_old" width="100%" height="750" type='application/pdf'>
                  </div>
              </q-card-section>

              <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                  <q-btn label="Batal" color="negative" v-close-popup />
              </q-card-actions>

          </q-card>
      </q-dialog>
      <!-- ================================================= MODAL LIHAT ================================================ -->

      <!-- =================================================== MODAL =========================================================== -->
  </div>
</template>

<script>
import FETCHING from '../../library/fetching'
import DATA_MASTER from '../../library/dataMaster'
import UMUM from '../../library/umum'

import { ModelSelect, ModelListSelect  } from 'vue-search-select'
import "vue-search-select/dist/VueSearchSelect.css"

export default {

  components: {
    ModelSelect, ModelListSelect, 
  },

  data() {
      return {

          FETCHING : FETCHING,
          UMUM : UMUM,

          form : {
              id          : '',
              judul       : '',
              tgl         : new Date().toISOString().substr(0, 10),
              start       : new Date().toTimeString().substr(0, 5),
              finish      : new Date().toTimeString().substr(0, 5),
              status      : '',
              keterangan  : '',
              file        : null,
              file_old    : null,
          },

          lampiran : {
              id          : '',
              keterangan  : '',
              file        : '',
              createdAt   : '',
              file_old    : '',
          },

          list_data       : [],
          list_dokumen       : [],

          file_path: this.$store.state.url.URL_APP + "uploads/",

          page_first      : 1,
          page_last       : 0,
          cari_value      : "",
          cek_load_data   : true,

          mdl_lihat    : false,
          mdl_add         : false,
          mdl_forward     : false,
          mdl_edit        : false,
          mdl_hapus       : false,
          btn_add         : false,

          filterku : {
              instansi : '',
              unit_kerja : '',
              fileStat : false,
          },

          DATA_MASTER : DATA_MASTER,

          nm_jabatan : '',
          nm_unit_kerja : '',

          instansi_id : '',
          unit_kerja : '',
          unit_kerja_full : '',
          unit_kerja_edit : '',

      }
  },

  methods: {

      getView : function(){
          this.$store.commit("showLoading");
          fetch(this.$store.state.url.URL_Agenda + "viewAdmin", {
              method: "POST",
              headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({
                  data_ke: this.page_first,
                  cari_value: this.cari_value,
                  page_limit : this.page_limit,
                  unit_kerja : this.filterku.unit_kerja,
              })
          })
              .then(res => res.json())
              .then(res_data => {
                  console.log(res_data);
                  
                  this.list_data = res_data.data;
                  this.page_last = res_data.jml_data;
                  this.$store.commit("hideLoading");
          });
      },

      agendakan : function(){
          
          fetch(this.$store.state.url.URL_Agenda + "accept", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
                  authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify(this.form)
          }).then(res_data => {
              this.Notify('Sukses Mengagendakan', 'cyan-7', 'check_circle_outline');
              this.getView();
          });
      },

      batalkan : function(){
          fetch(this.$store.state.url.URL_Agenda + "cancel", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
                  authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify(this.form)
          }).then(res_data => {
              this.Notify('Sukses Membatalkan', 'red-7', 'check_circle_outline');
              this.getView();
          });
      },

      removeData : function(a, b){
          fetch(this.$store.state.url.URL_Agenda + "removeData", {
              method: "POST",
              headers: {
                  "content-type": "application/json",
                  authorization: "kikensbatara " + localStorage.token
              },
              body: JSON.stringify({id : a, file : b})
          }).then(res_data => {
              this.Notify('Sukses Menghapus Data', 'negative', 'check_circle_outline');
              this.getView();
          });
      },

      selectData : function(data){
          this.form.id            = data.id
          this.form.judul         = data.judul
          this.form.tgl           = data.tgl
          this.form.start         = data.start
          this.form.finish        = data.finish
          this.form.status        = data.status
          this.form.keterangan    = data.keterangan
          this.form.createdAt     = data.createdAt
          this.form.file          = this.form.file
          this.form.file_old      = data.file
      },

      // ====================================== PAGINATE ====================================
      Notify : function(message, positive, icon){
          this.$q.notify({
              message: message,
              color: positive,
              icon: icon,
              position : 'top',
              timeout: 500,
          })
      },

      btn_prev : function(){
          this.cek_load_data = true;
          if(this.page_first>1){
              this.page_first--
          }else{
              this.page_first = 1;
          }
          this.getView();
      },

      btn_next : function(){
          if(this.page_first >= this.page_last){
              this.page_first == this.page_last
          }else{
              this.page_first++;
          }
          this.getView();
      },

      cari_data : function(){
          this.page_first = 1;
          this.getView();
      },
      // ====================================== PAGINATE ====================================

  },

  mounted () {
      var get_profile = JSON.parse(localStorage.profile);
      this.filterku.unit_kerja = get_profile.profile.unit_kerja;
      this.filterku.instansi = get_profile.profile.instansi_id;
      this.unit_kerja_full = get_profile.profile.unit_kerja_nama;
      this.unit_kerja = get_profile.profile.unit_kerja;
      console.log(this.unit_kerja);
      
      // this.form.unit_kerja = get_profile.profile.unit_kerja;

      // this.dataku.unit_kerja = get_profile.profile.unit_kerja;

      DATA_MASTER.getInstansi();
      DATA_MASTER.getUnitKerja(this.filterku.instansi);
      DATA_MASTER.getBiodata(this.filterku.unit_kerja);
      this.getView();
      
  },
}

</script>