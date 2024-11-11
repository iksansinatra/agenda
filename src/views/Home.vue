<template>
  <div style="padding:15px">
    <q-card bordered class="my-card">
      <q-card-section class="bg-cyan-9 text-white">
        <div class="row">
          <div class="col-12 col-md-2">
            <div class="text-h5 h_titleHead">Dashboard</div>
          </div>
        </div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>

         <div class="row">
           <div class="col-12 col-md-3 frWidget">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center bg-cyan-8 row items-center justify-center">
                  <q-icon name="event" style="font-size:420%; color:white" />
                </div>
                <div class="col-8 frWidgetSub2 bg-cyan-6">
                  <span class="frWidgetText1">Jumlah Agenda</span> <br>
                  <span class="frWidgetText2">{{agenda_jumlah}}</span>
                </div>
             </div>
           </div>
            <div class="col-12 col-md-3 frWidget ">
              <div class="row shadow-5 frWidgetSub">
                 <div class="col-4 frWidgetSub1 text-center bg-orange-8 row items-center justify-center">
                   <q-icon name="pending" style="font-size:420%; color:white" />
                 </div>
                 <div class="col-8 frWidgetSub2 bg-orange-6">
                   <span class="frWidgetText1">Agenda Diproses</span> <br>
                   <span class="frWidgetText2">{{agenda_proses}}</span>
                 </div>
              </div>
            </div>
           <div class="col-12 col-md-3 frWidget ">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center bg-light-blue-8 row items-center justify-center">
                  <q-icon name="event_available" style="font-size:420%; color:white" />
                </div>
                <div class="col-8 frWidgetSub2 bg-light-blue-6">
                  <span class="frWidgetText1">Agenda Diterima</span> <br>
                  <span class="frWidgetText2">{{agenda_terima}}</span>
                </div>
             </div>
           </div>
           <div class="col-12 col-md-3 frWidget">
             <div class="row shadow-5 frWidgetSub">
                <div class="col-4 frWidgetSub1 text-center bg-red-8 row items-center justify-center">
                  <q-icon name="event_busy" style="font-size:420%; color:white" />
                </div>
                <div class="col-8 frWidgetSub2 bg-red-6">
                  <span class="frWidgetText1">Agenda Ditolak</span> <br>
                  <span class="frWidgetText2">{{agenda_tolak}}</span>
                </div>
             </div>
           </div>
         </div>
      </q-card-section>
    </q-card>
    <div class="row">
      <div class="col-12 col-md-12 padding1-5">
        <div class="frameChart shadow-2">
          <div style="display: flex; justify-content: center; align-items: center; flex-wrap: nowrap;">
            <div style="font-size: 2em;">AGENDA PIMPINAN DAERAH KABUPATEN KONAWE SELATAN</div>
          </div>
          <div class="row q-pa-md">
            <div class="col q-gutter-sm">
              <q-btn label="Today" @click="onToday"></q-btn>
              <q-btn label="Prev" @click="onPrev"></q-btn>
              <q-btn label="Next" @click="onNext"></q-btn>
            </div>
            <div class="col q-gutter-sm text-right">
              <!-- <div style="font-size: 2em;">{{ formattedMonth }}</div> -->
              <div style="font-size: 2em;">November 2024</div>
            </div>
          </div>
          <div style="display: flex; width: 100%;">
            <q-calendar-month
              ref="calendar"
              v-model="selectedDate"
              animated
              bordered
              focusable
              hoverable
              no-active-date
              :day-min-height="60"
              :day-height="0"
              @change="onChange"
              @moved="onMoved"
              @click-date="onClickDate"
              @click-day="onClickDay"
              @click-workweek="onClickWorkweek"
              @click-head-workweek="onClickHeadWorkweek"
              @click-head-day="onClickHeadDay"
            >
              <template #day="{ scope: { timestamp } }">
                <template
                  v-for="event in eventsMap[timestamp.date]"
                  :key="event.id"
                >
                  <div
                    :class="badgeClasses(event, 'day')"
                    :style="badgeStyles(event, 'day')"
                    class="my-event"
                  >
                    <div class="title q-calendar__ellipsis" @click="mdl_lihat = true, selectData(event)">
                      {{ event.judul }}
                      <q-tooltip>
                        Agenda : {{ event.judul }}
                      </q-tooltip>
                    </div>
                  </div>
                </template>
              </template>
            </q-calendar-month>
          </div>
        </div>
      </div>
    </div>


    <!-- ================================================= MODAL LIHAT ================================================ -->
    <q-dialog v-model="mdl_lihat" persistent>
            <q-card class="mdl-md">

                <q-card-section class="bg-cyan-8">
                    <div class="text-h6 h_modalhead">Detail Agenda</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <br>
                    <div class="row">
                      <div class="col-3">
                        <div style="font-size: 1.05em;">Agenda</div>
                      </div>
                      <div class="col-9">
                        <div style="font-size: 1.05em;">{{ form.judul }}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <div style="font-size: 1.05em;">Waktu Mulai</div>
                      </div>
                      <div class="col-9">
                        <div style="font-size: 1.05em;">{{ form.start }}</div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-3">
                        <div style="font-size: 1.05em;">Waktu Selesai</div>
                      </div>
                      <div class="col-9">
                        <div style="font-size: 1.05em;">{{ form.finish }}</div>
                      </div>
                    </div>
                </q-card-section>

                <q-card-actions class="bg-grey-4 mdl-footer" align="right">
                    <q-btn label="Tutup" color="negative" v-close-popup />
                </q-card-actions>

            </q-card>
        </q-dialog>
        <!-- ================================================= MODAL LIHAT ================================================ -->




  </div>
</template>

<script>

import {
  QCalendarMonth,
  addToDate,
  parseDate,
  parseTimestamp,
  today
} from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarMonth.sass'

const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export default {
  name: 'HomePage',
  components: {
    QCalendarMonth
  },
  data() {
    return {
      agenda_jumlah : '',
      agenda_proses : '',
      agenda_terima : '',
      agenda_tolak : '',
      selectedDate: today(),
      events: [],

      mdl_lihat : false,

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
      
    }
  },

  computed: {
    eventsMap () {
      const map = {}
      if (this.events.length > 0) {
        this.events.forEach(event => {
          (map[ event.date ] = (map[ event.date ] || [])).push(event)
          if (event.days !== undefined) {
            let timestamp = parseTimestamp(event.date)
            let days = event.days
            // add a new event for each day
            // skip 1st one which would have been done above
            do {
              timestamp = addToDate(timestamp, { day: 1 })
              if (!map[ timestamp.date ]) {
                map[ timestamp.date ] = []
              }
              map[ timestamp.date ].push(event)
              // already accounted for 1st day
            } while (--days > 1)
          }
        })
      }
      console.log(map)
      return map
    }
  },

  methods: {

    getView : function(){
        this.$store.commit("showLoading");
        fetch(this.$store.state.url.URL_Agenda + "view", {
            method: "POST",
            headers: {
            "content-type": "application/json",
            authorization: "kikensbatara " + localStorage.token
            }
        })
            .then(res => res.json())
            .then(res_data => {
                console.log(res_data);
                this.events = res_data.data;
                this.$store.commit("hideLoading");
        });
    },

    agendaTotal : function(){
      this.$store.commit("showLoading");
      fetch(this.$store.state.url.URL_Agenda + "total", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
      })
      .then(res => res.json())
      .then(res_data => {
        this.agenda_jumlah = res_data.data[0].jumlah;
        this.$store.commit("hideLoading");
      });
    },

    agendaTolak : function(){
      this.$store.commit("showLoading");
      fetch(this.$store.state.url.URL_Agenda + "tolak", {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: "kikensbatara " + localStorage.token
        },
      })
      .then(res => res.json())
      .then(res_data => {
          this.agenda_tolak = res_data.data[0].jumlah;
          this.$store.commit("hideLoading");   
      });
    },

    agendaProses : function(){
      this.$store.commit("showLoading");
      fetch(this.$store.state.url.URL_Agenda + "proses", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        },
      })
      .then(res => res.json())
      .then(res_data => {
        this.agenda_proses = res_data.data[0].jumlah;
        this.$store.commit("hideLoading");
      });
    },

    agendaTerima : function(){
      this.$store.commit("showLoading");
      fetch(this.$store.state.url.URL_Agenda + "terima", {
        method: "GET",
        headers: {
        "content-type": "application/json",
        authorization: "kikensbatara " + localStorage.token
        },
      })
      .then(res => res.json())
      .then(res_data => {
        this.agenda_terima = res_data.data[0].jumlah;
        this.$store.commit("hideLoading");    
      });
    },

    selectData : function(event){
        this.form.id            = event.id
        this.form.judul         = event.judul
        this.form.tgl           = event.tgl
        this.form.start         = event.start
        this.form.finish        = event.finish
        this.form.status        = event.status
        this.form.keterangan    = event.keterangan
        this.form.createdAt     = event.createdAt
        this.form.file          = this.form.file
        this.form.file_old      = event.file
    },

    badgeClasses (event, type) {
      return {
        [ `text-white bg-cyan-8` ]: true,
        'rounded-border': true
      }
    },

    badgeStyles (day, event) {
      const s = {}
      // s.left = day.weekday === 0 ? 0 : (day.weekday * this.parsedCellWidth) + '%'
      // s.top = 0
      // s.bottom = 0
      // s.width = (event.days * this.parsedCellWidth) + '%'
      return s
    },

    onToday () {
      this.$refs.calendar.moveToToday()
    },
    onPrev () {
      this.$refs.calendar.prev()
    },
    onNext () {
      this.$refs.calendar.next()
    },
    onMoved (data) {
      console.log('onMoved', data)
    },
    onChange (data) {
      console.log('onChange', data)
    },
    onClickDate (data) {
      console.log('onClickDate', data)
    },
    onClickDay (data) {
      console.log('onClickDay', data)
    },
    onClickWorkweek (data) {
      console.log('onClickWorkweek', data)
    },
    onClickHeadDay (data) {
      console.log('onClickHeadDay', data)
    },
    onClickHeadWorkweek (data) {
      console.log('onClickHeadWorkweek', data)
    }

  },
  mounted () {
    this.agendaTolak();
    this.agendaProses();
    this.agendaTotal();
    this.agendaTerima();
    this.getView()
  },
}
</script>

<style lang="sass" scoped>
.my-event
  position: relative
  font-size: 12px
  width: 100%
  margin: 1px 0 0 0
  justify-content: center
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.rounded-border
  border-radius: 2px
</style>