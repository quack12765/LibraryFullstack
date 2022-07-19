import 'es6-promise/auto'
import "@babel/polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import CoreuiVue from '@coreui/vue'
import Multiselect from 'vue-multiselect'
import VueUploadComponent from 'vue-upload-component'
import { iconsSet as icons } from './assets/icons/icons.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faPauseCircle, faStopCircle, faAngleDoubleRight, faSignInAlt, faSignOutAlt, faFileDownload, faEye, faUser, faFileAlt,
  faWeight, faSyncAlt, faArrowDown, faArrowUp, faClipboardCheck, faTrashAlt, faPlus, faPencilAlt, faSearch,
  faTools, faBug, faFileInvoice, faCogs, faClipboardList, faUndoAlt, faUserPlus, faKey, faTachometerAlt, faRainbow,
  faPowerOff, faToggleOn, faToggleOff, faCog, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import dataV from '@jiaminghi/data-view'

import mixin from "./mixin"
import VueRouter from 'vue-router'


library.add(faPlayCircle, faPauseCircle, faStopCircle, faAngleDoubleRight, faSignInAlt, faSignOutAlt, faFileDownload, faEye, faUser,
  faFileAlt, faWeight, faSyncAlt, faArrowDown, faArrowUp, faClipboardCheck, faTrashAlt, faPlus, faPencilAlt, faSearch,
  faTools, faBug, faFileInvoice, faCogs, faClipboardList, faUndoAlt, faUserPlus, faKey, faTachometerAlt, faRainbow,
  faPowerOff, faToggleOn, faToggleOff, faCog, faTimesCircle)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('multiselect', Multiselect)
Vue.component('file-upload', VueUploadComponent)

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.use(dataV)
// Vue.use(router)

Vue.mixin(mixin)

var root = location.protocol+'//'+location.hostname

let api_port = ':3003'
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? root + api_port : root + api_port


Vue.prototype.$http = axios

new Vue({
  el: '#app',
  router,
  icons,
  store,
  template: '<App/>',
  components: {
    App
  },
})
