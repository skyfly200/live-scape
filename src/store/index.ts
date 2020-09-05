import Vue from 'vue'
import Vuex from 'vuex'

import { vuexfireMutations } from 'vuexfire'

import Auth from './modules/auth'
import Timeclock from './modules/timeclock'
import Jobs from './modules/jobs'
import Tasks from './modules/tasks'
import Location from './modules/location'
import Contacts from './modules/contacts'
import Tools from './modules/tools'
import Materials from './modules/materials'
import Clients from './modules/clients'
import Contractors from './modules/contractors'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: Auth,
    timeclock: Timeclock,
    taskSys: Tasks,
    jobs: Jobs,
    location: Location,
    contacts: Contacts,
    tools: Tools,
    materials: Materials,
    clients: Clients,
    contractors: Contractors,
  },
  state: {},
  mutations: {
    ...vuexfireMutations,
  },
  actions: {},
  getters: {},
})
