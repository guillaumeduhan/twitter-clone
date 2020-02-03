import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'
import { firestorePlugin } from 'vuefire'
import firebaseFunctions from './services/firebaseFunctions'
import App from './App.vue'
import router from './router'
import store from './store'

import MyPlugin from './plugins/my-plugin'

Vue.use(BootstrapVue)
Vue.use(MyPlugin)
Vue.use(firestorePlugin)
Vue.use(require('vue-moment'))

Vue.config.productionTip = false
Vue.prototype.$log = console.log

Vue.filter('letterGenerator', (string) => {
  return string.split('')[0].toUpperCase()
})

firebase
.auth()
.onAuthStateChanged((user) => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
  if (user) {
    firebaseFunctions.getUser(user.uid)
    .then((userData) => {
      store.dispatch('setProfileToStore', userData.data())
      router.push(`/profile/${userData.data().id}`).catch((err) => {})
    })
  } else {
    router.push('/login')
  }
})
