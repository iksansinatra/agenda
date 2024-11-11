import { createApp } from 'vue'
import App from './App.vue'
import { Quasar, Loading, Notify } from 'quasar'
import router from './router'
import store from './store'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(router).use(store).use(Quasar, { plugins: { Loading, Notify } }, quasarUserOptions).mount('#app')
