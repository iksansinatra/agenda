<template>
    <div class="about" style="padding:15px">
      <q-card bordered class="my-card">
        <q-card-section class="bg-cyan-9 text-white">
          <div class="row">
            <div class="col-12 col-md-9">
              <div class="row" style="margin: 0 5px 2px">
              <div class="text-h6">Data Master Kelompok Users</div>
              </div>
            </div>
            <div class="col-12 col-md-3">
              <div class="row" style="margin: 0 5px 2px">
                <q-input color="light-blue-7" v-model="cari_value" @keyup="cari_data()" outlined square :dense="true" class="bg-white" style="width:85%"/>
                <q-btn glossy class="bg-light-blue-7" @click="mdl_add = true, funcAwaitAdd()" dense flat icon="add" style="width:15%">
                  <q-tooltip class="bg-light-blue-7" transition-show="flip-right" transition-hide="flip-left" :offset="[10, 10]">
                    Tambah Data
                  </q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
  
        <q-separator dark inset />
  
        <q-card-section>
          <div class="tbl_responsive">
            <!-- =================================================== KONTENT =========================================================== -->
            


            <table width="100%">
              <tr class="h_table_head bg-blue-2">
                <th width="5%" class="text-center">No</th>
                <th width="85%">Nama Kelompok</th>
                <th width="10%"></th>
              </tr>
                <tr class="h_table_body" v-for="(data, index) in list_data" :key="data.id">
                <td class="text-center">{{indexing(index+1)}}.</td>
                <td>{{data.uraian}}</td>
               
                <td class="text-center">
                  <q-btn-group>
                    <q-btn @click="selectData(data), mdl_edit=true" glossy color="orange" icon="create" class="tbl_btn">
                      <q-tooltip content-class="bg-orange-9" content-style="font-size: 13px">
                        Click untuk mengubah data ini
                      </q-tooltip>
                    </q-btn>
                    <q-btn @click="selectData(data), mdl_remove = true" glossy color="negative" icon="delete_forever" class="tbl_btn">
                      <q-tooltip content-class="bg-red" content-style="font-size: 13px">
                        Click untuk menghapus data ini
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
          <q-btn @click="btn_prev" glossy color="cyan-9" icon="skip_previous" class="paginate_btn" />
            <span class="h_pagination">&nbsp; {{page_first}} - {{page_last}} &nbsp;</span>
          <q-btn @click="btn_next" glossy color="cyan-9" icon="skip_next" class="paginate_btn" />
        </div>
        <br>
          </q-card-section>
        </q-card>

        <!-- =================================================== MODAL =========================================================== -->


            <!-- ================================================= MODAL TAMBAH ================================================ -->
            <q-dialog v-model="mdl_add" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-primary">
                    <div class="text-h6 h_modalhead text-center">Simpan Data</div>
                  </q-card-section>

                  <form @submit.prevent="addData()">
                    <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari">

                            <span class="h_lable ">*Nama Klp</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />

                            <div class="tbl_responsive">

                              <table width="100%" >
                                <tr class="h_table_head bg-blue-9" style="color:white">
                                  <th colspan="3" class="text-center">KODE</th>
                                  <th width="45%">Menu</th>
                                  <th width="40%">Akses</th>
                                </tr>

                                <template v-for="data in list_menu" :key="data.id">
                                  <tr class="h_table_body bg-blue-3" style="color:#737373">
                                    <td width="5%" class="text-center">{{data.urutan}}</td>
                                    <td width="5%" class="text-center">-</td>
                                    <td width="5%" class="text-center">-</td>
                                    <td width="45%" class=""><b>{{data.title}}</b></td>
                                    <td width="40%" class="text-center">
                                      <div v-if="!data.type">
                                        <input type="checkbox" :id="'vehicle1'+data.urutan+'satu'" name="vehicle1" v-model="data.readx" style="margin-left:3%; accent-color: #0FA668;">
                                        <label :for="'vehicle1'+data.urutan+'satu'"> Read </label>
                                        <input type="checkbox" :id="'vehicle2'+data.urutan+'satu'" name="vehicle2" v-model="data.addx" style="margin-left:3%; accent-color: #3695E4;">
                                        <label :for="'vehicle2'+data.urutan+'satu'"> Add </label>
                                        <input type="checkbox" :id="'vehicle3'+data.urutan+'satu'" name="vehicle2" v-model="data.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                        <label :for="'vehicle3'+data.urutan+'satu'"> Edit </label>
                                        <input type="checkbox" :id="'vehicle4'+data.urutan+'satu'" name="vehicle2" v-model="data.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                        <label :for="'vehicle4'+data.urutan+'satu'"> Delete </label>
                                      </div>
                                    </td>
                                  </tr>

                                  <template  v-for="data1 in data.subItem" :key="data1.id">
                                    <tr class="h_table_body bg-blue-1" >
                                      <td width="5%" class="text-center">{{data.urutan}}</td>
                                      <td width="5%" class="text-center">{{data1.urutan}}</td>
                                      <td width="5%" class="text-center">-</td>
                                      <td width="45%" class="">{{data1.title}}</td>
                                      <td width="40%" class="text-center">
                                        <div v-if="!data1.type">
                                          <input type="checkbox" :id="'vehicle1'+data1.urutan+'dua'" name="vehicle1" v-model="data1.readx" style="margin-left:3%; accent-color: #0FA668;">
                                          <label :for="'vehicle1'+data1.urutan+'dua'"> Read </label>
                                          <input type="checkbox" :id="'vehicle2'+data1.urutan+'dua'" name="vehicle2" v-model="data1.addx" style="margin-left:3%; accent-color: #3695E4;">
                                          <label :for="'vehicle2'+data1.urutan+'dua'"> Add </label>
                                          <input type="checkbox" :id="'vehicle3'+data1.urutan+'dua'" name="vehicle2" v-model="data1.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                          <label :for="'vehicle3'+data1.urutan+'dua'"> Edit </label>
                                          <input type="checkbox" :id="'vehicle4'+data1.urutan+'dua'" name="vehicle2" v-model="data1.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                          <label :for="'vehicle4'+data1.urutan+'dua'"> Delete </label>
                                        </div>
                                      </td>
                                    </tr>

                                    <template  v-for="data2 in data1.subItem" :key="data2.id">
                                      <tr class="h_table_body" >
                                        <td width="5%" class="text-center">{{data.urutan}}</td>
                                        <td width="5%" class="text-center">{{data1.urutan}}</td>
                                        <td width="5%" class="text-center">{{data2.urutan}}</td>
                                        <td width="45%" class=""><i>{{data2.title}}</i></td>
                                        <td width="40%" class="text-center">
                                          <div v-if="!data2.type">
                                            <input type="checkbox" :id="'vehicle1'+data2.urutan+'tiga'" name="vehicle1" v-model="data2.readx" style="margin-left:3%; accent-color: #0FA668;">
                                            <label :for="'vehicle1'+data2.urutan+'tiga'"> Read </label>
                                            <input type="checkbox" :id="'vehicle2'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.addx" style="margin-left:3%; accent-color: #3695E4;">
                                            <label :for="'vehicle2'+data2.urutan+'tiga'"> Add </label>
                                            <input type="checkbox" :id="'vehicle3'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                            <label :for="'vehicle3'+data2.urutan+'tiga'"> Edit </label>
                                            <input type="checkbox" :id="'vehicle4'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                            <label :for="'vehicle4'+data2.urutan+'tiga'"> Delete </label>
                                          </div>
                                        </td>
                                      </tr>
                                    </template>

                                  </template>

                                </template>

                              </table>
                        
                            </div>



                          </div>

                        </div>

                    </q-card-section>

                    <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                        <q-btn color="primary" @click="addData()" label="Simpan" />
                        <q-btn label="Batal" color="negative" v-close-popup />
                    </q-card-actions>

                  </form>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL TAMBAH ================================================ -->

            <!-- ================================================= MODAL EDIT ================================================ -->
            <q-dialog v-model="mdl_edit" persistent>
                <q-card class="mdl-md">
                  <q-card-section class="bg-orange">
                    <div class="text-h6 h_modalhead text-center">Edit Data</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                        <br>
                        <div class="row">

                          <div class="col-12 col-md-12 frame_cari">

                            <span class="h_lable ">*Nama Klp</span>
                            <q-input v-model="form.uraian" outlined square :dense="true" class="bg-white margin_btn" />

                            <div class="tbl_responsive">

                              <table width="100%" >
                                <tr class="h_table_head bg-orange-9" style="color:white">
                                  <th colspan="3" class="text-center">KODE</th>
                                  <th width="45%">Menu</th>
                                  <th width="40%">Akses</th>
                                </tr>

                                <template v-for="data in list_menu" :key="data.id">
                                  <tr class="h_table_body bg-orange-3" style="color:#737373">
                                    <td width="5%" class="text-center">{{data.urutan}}</td>
                                    <td width="5%" class="text-center">-</td>
                                    <td width="5%" class="text-center">-</td>
                                    <td width="45%" class=""><b>{{data.title}}</b></td>
                                    <td width="40%" class="text-center">
                                      <div v-if="!data.type">
                                        <input type="checkbox" :id="'vehicle1'+data.urutan+'satu'" name="vehicle1" v-model="data.readx" style="margin-left:3%; accent-color: #0FA668;">
                                        <label :for="'vehicle1'+data.urutan+'satu'"> Read </label>
                                        <input type="checkbox" :id="'vehicle2'+data.urutan+'satu'" name="vehicle2" v-model="data.addx" style="margin-left:3%; accent-color: #3695E4;">
                                        <label :for="'vehicle2'+data.urutan+'satu'"> Add </label>
                                        <input type="checkbox" :id="'vehicle3'+data.urutan+'satu'" name="vehicle2" v-model="data.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                        <label :for="'vehicle3'+data.urutan+'satu'"> Edit </label>
                                        <input type="checkbox" :id="'vehicle4'+data.urutan+'satu'" name="vehicle2" v-model="data.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                        <label :for="'vehicle4'+data.urutan+'satu'"> Delete </label>
                                      </div>
                                    </td>
                                  </tr>

                                  <template  v-for="data1 in data.subItem" :key="data1.id">
                                    <tr class="h_table_body bg-orange-1" >
                                      <td width="5%" class="text-center">{{data.urutan}}</td>
                                      <td width="5%" class="text-center">{{data1.urutan}}</td>
                                      <td width="5%" class="text-center">-</td>
                                      <td width="45%" class="">{{data1.title}}</td>
                                      <td width="40%" class="text-center">
                                        <div v-if="!data1.type">
                                          <input type="checkbox" :id="'vehicle1'+data1.urutan+'dua'" name="vehicle1" v-model="data1.readx" style="margin-left:3%; accent-color: #0FA668;">
                                          <label :for="'vehicle1'+data1.urutan+'dua'"> Read </label>
                                          <input type="checkbox" :id="'vehicle2'+data1.urutan+'dua'" name="vehicle2" v-model="data1.addx" style="margin-left:3%; accent-color: #3695E4;">
                                          <label :for="'vehicle2'+data1.urutan+'dua'"> Add </label>
                                          <input type="checkbox" :id="'vehicle3'+data1.urutan+'dua'" name="vehicle2" v-model="data1.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                          <label :for="'vehicle3'+data1.urutan+'dua'"> Edit </label>
                                          <input type="checkbox" :id="'vehicle4'+data1.urutan+'dua'" name="vehicle2" v-model="data1.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                          <label :for="'vehicle4'+data1.urutan+'dua'"> Delete </label>
                                        </div>
                                      </td>
                                    </tr>

                                    <template  v-for="data2 in data1.subItem" :key="data2.id">
                                      <tr class="h_table_body" >
                                        <td width="5%" class="text-center">{{data.urutan}}</td>
                                        <td width="5%" class="text-center">{{data1.urutan}}</td>
                                        <td width="5%" class="text-center">{{data2.urutan}}</td>
                                        <td width="45%" class=""><i>{{data2.title}}</i></td>
                                        <td width="40%" class="text-center">
                                          <div v-if="!data2.type">
                                            <input type="checkbox" :id="'vehicle1'+data2.urutan+'tiga'" name="vehicle1" v-model="data2.readx" style="margin-left:3%; accent-color: #0FA668;">
                                            <label :for="'vehicle1'+data2.urutan+'tiga'"> Read </label>
                                            <input type="checkbox" :id="'vehicle2'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.addx" style="margin-left:3%; accent-color: #3695E4;">
                                            <label :for="'vehicle2'+data2.urutan+'tiga'"> Add </label>
                                            <input type="checkbox" :id="'vehicle3'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.updatex" style="margin-left:3%; accent-color: #A67D0F;">
                                            <label :for="'vehicle3'+data2.urutan+'tiga'"> Edit </label>
                                            <input type="checkbox" :id="'vehicle4'+data2.urutan+'tiga'" name="vehicle2" v-model="data2.deletex" style="margin-left:3%; accent-color: #DB4839;">
                                            <label :for="'vehicle4'+data2.urutan+'tiga'"> Delete </label>
                                          </div>
                                        </td>
                                      </tr>
                                    </template>

                                  </template>

                                </template>

                              </table>
                        
                            </div>


                          </div>

                        </div>

                  </q-card-section>

                  <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    
                      <q-btn color="orange" @click="editData()" label="Simpan" />
                      <q-btn label="Batal" color="negative" v-close-popup />
             
                  </q-card-actions>
                </q-card>
              </q-dialog>
            <!-- ================================================= MODAL EDIT ================================================ -->

            <!-- ================================================ MODAL HAPUS ================================================ -->
              <q-dialog v-model="mdl_remove" persistent>
                <q-card class="mdl-sm ">
                  <q-card-section class="q-pt-none text-center orageGrad">
                      <form @submit.prevent="removeData">
                          <br>
                          <img src="img/alert.png" alt="" width="75"> <br>
                          <span class="h_notifikasi">APAKAH ANDA YAKIN INGIN MENGHAPUS DATA INI??</span>
                          <input type="submit" style="position: absolute; left: -9999px"/>
                          <br>
                          <br>

                        <q-btn label="Batal" size="sm" color="negative"  v-close-popup/>
                        &nbsp;
                        <q-btn type="submit" label="Hapus" size="sm" color="primary" v-close-popup/>

                      </form>
                  </q-card-section>
                </q-card>
              </q-dialog>
            <!-- ================================================ MODAL HAPUS ================================================ -->

         
          <!-- =================================================== MODAL =========================================================== -->
  
    </div>
  </template>
  
  <script>
    import UMUM from         '../../library/umum'
    import FETCHING from "../../library/fetching";

  export default {
    name: 'UmumPage',
    data() {
      return {
        form : {
          id : '',
          uraian : '',
        },

        page_first: 1,
        page_last: 0,
        page_limit : 10,
        cari_value: "",
        FETCHING : FETCHING,
        UMUM : UMUM,


        page: 1,
        mdl_add : false,
        mdl_edit : false,
        mdl_remove : false,

        cthSelect : '',

        list_data : [],
        list_menu : [],
      }
    },
    methods: {
        getView : function(){
          this.$store.commit("showLoading");
        console.log(this.cari_value);
        
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "view", {
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
              console.log(res_data)
              this.list_data = res_data.data;
              this.page_last = res_data.jml_data;
              this.$store.commit("hideLoading");
        });
      },


      addData : function() {
        // this.form.createdAt = UMUM.NOW()
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "addData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              list_menu : this.list_menu
            })
        }).then(res_data => {
            this.getView();
            this.Notify('Sukses Menambah Data', 'primary', 'check_circle_outline');
        });


      },

      editData : function(){
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "editData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify({
              form : this.form,
              list_menu : this.list_menu
            })
        }).then(res_data => {

            this.getView();
            this.Notify('Sukses Mengubah Data', 'primary', 'check_circle_outline');
        });
      },

      removeData : async function(data){

        await UMUM.notifDelete();
        fetch(this.$store.state.url.URL_DM_KLP_USERS + "removeData", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: "kikensbatara " + localStorage.token
            },
            body: JSON.stringify(data)
        }).then(res_data => {
            this.getView();
            this.mdl_remove = false;
            this.Notify('Sukses Menghapus Data', 'primary', 'check_circle_outline');
        });

      },

      selectData : async function(data){
          this.form.id = data.id;
          this.form.uraian = data.uraian;
          this.list_menu = await this.FETCHING.postMasterMenu(data.id);

      },

      // ====================================== PAGINATE ====================================
        indexing : function(index){
            var idx = ((this.page_first-1)*this.page_limit)+index
            return idx
        },

        cari_data : function(){
            this.page_first = 1;
            this.getView();
        },


        funcAwaitAdd : async function(){
          this.list_menu = await this.FETCHING.getMasterMenu();
        }


      // ====================================== PAGINATE ====================================
  
    },
    mounted() {
      this.getView();
    }
  }
  </script>
  