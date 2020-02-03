import Vue from 'vue'
import Vuex from 'vuex'
import Timeline from './modules/timeline'
import User from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Timeline,
    User,
  },
})
