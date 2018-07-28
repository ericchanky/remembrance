import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import phrase from './phrase'
import wallpaper from './wallpaper'
import route from './route'

import { name } from '../../package.json'

const vuexLocal = new VuexPersistence({
  key: name,
  strictMode: true,
  storage: window.localStorage,
})

export default () => new Vuex.Store({
  strict: true,
  modules: {
    phrase,
    wallpaper,
    route,
  },
  mutations: {
    RESTORE_MUTATION: vuexLocal.RESTORE_MUTATION,
  },
  plugins: [vuexLocal.plugin],
})
