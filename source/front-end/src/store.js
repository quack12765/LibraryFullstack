import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'

Vue.use(Vuex)


const store = new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    line_id: '',
    line_name: '',
    equip_mac: '',
    equip_name: '',
    equip_ip: '',
    spec: '',
    lotNo: ''
  },
  getters: {
    line_id(state) {
      return state.line_id
    },
    line_name(state) {
      return state.line_name
    },
    equip_mac(state) {
      return state.equip_mac
    },
    equip_name(state) {
      return state.equip_name
    },
    equip_ip(state) {
      return state.equip_ip
    },
    spec(state) {
      return state.spec
    },
    lotNo(state) {
      return state.lotNo
    }
  },
  mutations: {
    setLine(state, payload) {
      state.line_id = payload.line_id
      state.line_name = payload.line_name
      state.equip_mac = payload.equip_mac
      state.equip_name = payload.equip_name
      state.equip_ip = payload.equip_ip
    },
    setSpecNo(state, payload) {
      state.spec = payload.spec
      state.lotNo = payload.lotNo
    },
  },
  actions: {
    getInitState({commit}) {
      return axios.get('/api/getLastWorkInfo')
        .then(res => {
          if(res.data.length>0) {
            commit('setSpecNo', {spec: res.data[0].D1030, lotNo: res.data[0].D1050})
          }
        })
    }
  }
})

export default store