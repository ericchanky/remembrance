import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

import phrase from './phrase'
import wallpaper from './wallpaper'
import route from './route'

import { name } from '../../package.json'

const phraseStore = new VuexPersistence({
  key: `${name}-phrase`,
  strictMode: true,
  storage: window.localStorage,
  modules: ['phrase'],
})

const wallpaperStore = new VuexPersistence({
  key: `${name}-wallpaper`,
  strictMode: true,
  storage: window.localStorage,
  modules: ['wallpaper'],
})

export default () => new Vuex.Store({
  strict: true,
  modules: {
    phrase,
    wallpaper,
    route,
  },
  mutations: {
    RESTORE_MUTATION: phraseStore.RESTORE_MUTATION,
  },
  plugins: [phraseStore.plugin, wallpaperStore.plugin],
})
