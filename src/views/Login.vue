<template>
  <div class="bgku">
    <div class="row items-center">
      <div class="col-11 col-md-3 fixed-center">

        <div class="putihTrans formLogin shadow-5">
          <br>
            <q-img src="img/krad.png" />
            <hr />
            <br />

            <div v-if="pesanError">
              <div  class="alertku shadow-2">
                <strong>Warning!</strong> {{ pesanError }}.

              </div>
              <br>
            </div>

            <form @submit.prevent="btn_loginz()">
              <q-input v-model="user.username" outlined square color="cyan-9" :dense="true" class="bg-white" placeholder="Username">
                <template v-slot:prepend>
                  <q-icon color="cyan-9" name="account_circle" />
                </template>
              </q-input>
              <br />

              <q-input
                 v-model="user.password"
                outlined
                square
                :dense="true"
                class="bg-white"
                color="cyan-9"
                placeholder="Password"
                type="password"
              >
                <template v-slot:prepend>
                  <q-icon color="cyan-9" name="vpn_key" />
                </template>
              </q-input>
              <br />

              <q-btn type="submit" no-caps push class="full-width q-mb-xs" color="cyan-9" label="LOGIN" />
            </form>
            <hr>
            <div class="transAbu text-center" style="border-radius: 5px;">
              <span class="h_fotter_title">Copyright : Diskominfo & Bagian Protokoler Kabupaten Konawe Selatan</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Joi from "joi";
  const schema = Joi.object().keys({
    username: Joi.string().regex(/^[a-zA-Z0-9_]*$/).min(3).max(13).required()
  });
export default {
  name: 'LoginPage',
  data : function(){
      return {
          pesanError: '',
          user : {
            username : "",
            password : ""
          },

          url : {
            LOGIN_URL : this.$store.state.url.URL_APP + "auth/login"
          }
      }
    },
    watch: {
      user: {
          handler() {
              this.pesanError = "";
          },
          deep: true
      }
    },
    methods: {

      btn_loginz : function(){
        this.pesanError = '';
        if(this.validasiUser()){
          this.$store.commit('showLoading');
          const body = {
            username : this.user.username,
            password : this.user.password
          }
          fetch(this.url.LOGIN_URL, {
            method : 'POST',
            headers : {
              'content-type' : 'application/json',
            },
            body : JSON.stringify(body),
          }).then((response) => {

            // console.log(response);

                if (response.ok) {
                    return response.json();
                    // this.$store.commit("showLoading");
                }

                return response.json().then(error => {
                    throw new Error(error.message);
                    // this.$store.commit("showLoading");
                });
            })
            .then((result) => {
              console.log("=============================");
              console.log(result);
              // menyimpan token yang tergenerate dari server
              localStorage.token = result.token;
              localStorage.profile = JSON.stringify(result.profile);
              setTimeout(() => {
                this.$store.commit("hideLoading")
                this.$router.push('/');
              }, 1000);
            })
            .catch(error => {
              setTimeout(() => {
                this.$store.commit("hideLoading")
                this.pesanError = error.message;
              }, 1000);
            });
        }
      },

      validasiUser: function(){

        const body = {
              username: this.user.username
        };
        const result = schema.validate(body);
        if (result.error === null || result.error == undefined) {
          return true;
        }
        if (result.error.message.includes("username")) {
          this.pesanError = "Username tidak valid";
        } else {
          this.pesanError = "Password tidak valid";
        }
        return false;
      },

      Notify : function(message, positive, icon){
        this.$q.notify({
          message: message,
          color: positive,
          icon: icon,
          position : 'top',
          timeout: 500,
        })
      },

  },
  mounted() {
  }
}
</script>