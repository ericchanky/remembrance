import moment from 'moment'
import uuidv4 from 'uuid/v4'

import { randWith } from '../utils/rand'

export default {
  namespaced: true,
  state: {
    list: [],
    wallpaper: '',
    overlay: true,
    updated_at: moment().format(),
    frequency: 3, // hours
  },
  mutations: {
    addToList (state, data) {
      state.list.push({
        id: uuidv4(),
        url: data,
      })
    },
    removeFromList (state, data) {
      state.list = state.list.filter(item => item.id !== data)
    },
    setWallpaper (state, data) {
      state.wallpaper = data.url
      state.updated_at = moment().format()
    },
    toggleOverlay (state) {
      state.overlay = !state.overlay
    },
    updatedFrequency (state, data) {
      state.frequency = Number(data) || 1
    },
  },
  actions: {
    add ({ commit }, data) {
      commit('addToList', data)
    },
    remove ({ commit }, data) {
      commit('removeFromList', data)
    },
    show ({ commit, state }) {
      if (state.list.length > 0 && (state.wallpaper === '' || moment(state.updated_at).add(state.frequency, 'hours').isBefore(moment()))) {
        commit('setWallpaper', randWith(state.list))
      } else if (state.list.length === 0) {
        commit('setWallpaper', '')
      }
    },
    toggleOverlay ({ commit }) {
      commit('toggleOverlay')
    },
    updateFrequency ({ commit }, data) {
      commit('updatedFrequency', data)
    },
  },
}
