<template>
    <div class="about" style="padding:15px">
        <q-card bordered class="my-card">
            <q-card-section class="bg-cyan-9 text-white">
                <div class="row">
                    <div class="col-12 col-md-8">
                        <div class="text-h5 h_titleHead">Agenda</div>
                    </div>
                    <div class="col-12 col-md-4">
                        <div class="row">
                        <q-input v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:90%"/>
                        <q-btn class="bg-light-blue-9" @click="mdl_add = true" dense flat icon="add" style="width:10%">
                            <q-tooltip content-class="bg-light-blue-9" content-style="font-size: 10px">
                                Tambah Agenda
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
                                <q-btn v-if="data.status == 2" glossy color="red-5" icon="event_busy" class="tbl_btn" @click="mdl_ket = true, selectData(data)">
                                    <q-tooltip content-class="bg-red-5" content-style="font-size: 10px">
                                        Dibatalkan
                                    </q-tooltip>
                                </q-btn>
                                <q-btn v-if="data.status == 1" glossy color="cyan-5" icon="event_available" class="tbl_btn" @click="mdl_ket = true, selectData(data)">
                                    <q-tooltip content-class="bg-cyan-5" content-style="font-size: 10px">
                                        Diagendakan
                                    </q-tooltip>
                                </q-btn>
                                <q-btn v-if="data.status == null" glossy color="lime-7" icon="pending" class="tbl_btn">
                                    <q-tooltip content-class="bg-lime-7" content-style="font-size: 10px">
                                        Proses Verifikasi
                                    </q-tooltip>
                                </q-btn>
                            </td>
                            <td class="text-center">
                                <q-btn-group>
                                    <q-btn @click="mdl_lihat = true, selectData(data)" glossy color="blue" icon="text_snippet" class="tbl_btn">
                                        <q-tooltip content-class="bg-blue-9" content-style="font-size: 10px">
                                            Lampiran
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn @click="mdl_edit = true, selectData(data)" glossy color="orange" icon="create" class="tbl_btn">
                                        <q-tooltip content-class="bg-orange-9" content-style="font-size: 10px">
                                            Edit Data
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn @click="mdl_hapus = true, selectData(data)" glossy color="negative" icon="delete_forever" class="tbl_btn">
                                        <q-tooltip content-class="bg-red" content-style="font-size: 10px">
                                            Hapus Data
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

        <!-- ================================================= MODAL TAMBAH ================================================ -->
        <q-dialog v-model="mdl_add" persistent>
            <q-card class="mdl-md">

                <q-card-section class="bg-light-blue-9">
                    <div class="text-h6 h_modalhead">Tambah Agenda</div>
                </q-card-section>

                <form @submit.prevent="addData()">
                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">
                        <div class="col-12 col-md-12 frame_cari" style="padding-bottom: 7.5px;">
                            <span class="h_lable ">Agenda</span>
                            <q-input v-model="form.judul" outlined square :dense="true" type="text" class="bg-white margin_btn"/>
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Tanggal</span>
                            <q-input outlined square dense v-model="form.tgl" mask="date" :rules="['date']">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="form.tgl">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                        </q-date>
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Waktu Mulai</span>
                            <q-input outlined square dense v-model="form.start" mask="time" :rules="['time']">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="form.start" format24h>
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Waktu Selesai</span>
                            <q-input outlined square dense v-model="form.finish" mask="time" :rules="['time']">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="form.finish" format24h>
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Lampiran</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                <q-icon name="attach_file" />
                                </template>
                            </q-file>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="light-blue-9" @click="addData()" label="Simpan" />
                    <q-btn label="Batal" color="yellow-10" v-close-popup />
                </q-card-actions>
                </form>

            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL TAMBAH ================================================ -->

            <!-- ================================================= MODAL LIHAT ================================================ -->
         <q-dialog v-model="mdl_lihat" full-width persistent>
            <q-card class="full-width">

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

            <!-- ================================================= MODAL LIHAT ================================================ -->
        <q-dialog v-model="mdl_ket" persistent>
            <q-card class="mdl-md">

                <q-card-section class="bg-light-blue-8">
                    <div class="text-h6 h_modalhead">Keterangan</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="text-left">
                        <div style="font-size: 1.25em;">{{ form.keterangan }}</div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn label="Tutup" color="negative" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL LIHAT ================================================ -->

        <!-- ================================================= MODAL EDIT ================================================ -->
        <q-dialog v-model="mdl_edit" persistent>
            <q-card class="mdl-md">
                <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead">Edit Agenda</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">
                        <div class="col-12 col-md-12 frame_cari" style="padding-bottom: 7.5px;">
                            <span class="h_lable ">Agenda</span>
                            <q-input v-model="form.judul" outlined square :dense="true" type="text" class="bg-white margin_btn"/>
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Tanggal</span>
                            <q-input outlined square dense v-model="form.tgl" mask="date" :rules="['date']">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                        <q-date v-model="form.tgl">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                        </q-date>
                                    </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Waktu Mulai</span>
                            <q-input outlined square dense v-model="form.start" mask="time" :rules="['time']">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="form.start" format24h>
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-6 frame_cari">
                            <span class="h_lable ">Waktu Selesai</span>
                            <q-input outlined square dense v-model="form.finish" mask="time" :rules="['time']">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="form.finish" format24h>
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-12 col-md-12 frame_cari">
                            <span class="h_lable ">Lampiran</span>
                            <q-file v-model="form.file" outlined square :dense="true" class="bg-white margin_btn">
                                <template v-slot:prepend>
                                <q-icon name="attach_file" />
                                </template>
                            </q-file>
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn :loading="btn_add" color="orange" @click="editData()" label="Simpan" />
                    <q-btn label="Batal" color="negative" v-close-popup />        
                </q-card-actions>

            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL EDIT ================================================ -->

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

        <!-- =================================================== MODAL =========================================================== -->
    </div>
</template>

<script>
// import 'vue-search-select/dist/VueSearchSelect.css'
import FETCHING from '../library/fetching'
import DATA_MASTER from '../library/dataMaster'
import UMUM from '../library/umum'

export default {

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
                keterangan  : '',
                file        : null,
                file_old    : null,
            },

            list_data       : [],

            file_path: this.$store.state.url.URL_APP + "uploads/",

            page_first      : 1,
            page_last       : 0,
            cari_value      : "",
            cek_load_data   : true,

            mdl_lihat         : false,
            mdl_add         : false,
            mdl_ket         : false,
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
            fetch(this.$store.state.url.URL_Agenda + "viewUser", {
                method: "POST",
                headers: {
                "content-type": "application/json",
                authorization: "kikensbatara " + localStorage.token
                },
                body: JSON.stringify({
                    data_ke: this.page_first,
                    cari_value: this.cari_value,
                    page_limit : this.page_limit,
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

        addData : function() {
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append('file', this.form.file)
            fetch(this.$store.state.url.URL_Agenda + "addData", {
                method: "POST",
                headers: {
                    // "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Membuat Agenda', 'light-blue', 'check_circle_outline');
                this.getView();
            });
        },

        editData : function(){
            var formData = new FormData();
            formData.append('data', JSON.stringify(this.form))
            formData.append('file', this.form.file)
            fetch(this.$store.state.url.URL_Agenda + "editData", {
                method: "POST",
                headers: {
                    // "content-type": "application/json",
                    authorization: "kikensbatara " + localStorage.token
                },
                body: formData
            }).then(res_data => {
                this.Notify('Sukses Merubah Agenda', 'orange', 'check_circle_outline');
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
                this.Notify('Sukses Menghapus Agenda', 'negative', 'check_circle_outline');
                this.getView();
            });
        },

        selectData : function(data){
            this.form.id            = data.id
            this.form.judul         = data.judul
            this.form.tgl           = data.tgl
            this.form.start         = data.start
            this.form.finish        = data.finish
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