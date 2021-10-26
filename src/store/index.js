import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    traveler: {},
  },
  mutations: {
    setTraveler(state, traveler) {
      state.traveler = traveler
    },
  },
  actions: {

  },
  modules: {},
})
