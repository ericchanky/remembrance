import moment from 'moment'
import uuidv4 from 'uuid/v4'

import { fetchPhrase } from '../utils/fetch'
import { randWithObj } from '../utils/rand'

const loading = 'Loading...'

export default {
  namespaced: true,
  state: {
    phrases: [],
    phrase: null,
    automated: false,
    url: '',
    updated_at: moment().format(),
  },
  mutations: {
    setPhrase (state, data) {
      state.phrase = data
      state.updated_at = moment().format()
    },
    add (state, data) {
      state.phrases.push({
        id: uuidv4(),
        ...data,
      })
    },
    clear (state) {
      state.phrases = []
    },
    update (state, data) {
      state.phrases = data
    },
    remove (state, data) {
      state.phrases = data
    },
    toggleAutomated (state) {
      state.automated = !state.automated
    },
    setURL (state, data) {
      state.url = data
    },
  },
  actions: {
    automate ({ commit, state }) {
      if (state.automated && state.url !== '') {
        commit('clear')
        fetchPhrase(state.url)
          .then(phrases => phrases.forEach(phrase => commit('add', phrase)))
      }
    },
    show ({ dispatch, commit, state }) {
      if (Object.keys(state.phrases).length > 0 && (state.phrase == null || state.phrase.phrase === loading || moment(state.updated_at).add(1, 'hour').isSameOrBefore(moment()))) {
        commit('setPhrase', randWithObj(state.phrases))
        dispatch('automate')
      } else if (Object.keys(state.phrases).length === 0) {
        commit('setPhrase', { phrase: loading, author: '' })
      }
    },
    add ({ commit }, data) {
      commit('add', data)
    },
    clear ({ commit }) {
      commit('clear')
    },
    update ({ commit, state }, data) {
      commit('update', state.phrases.map(phrase => phrase.id === data.id ? data : phrase))
    },
    remove ({ commit, state }, data) {
      commit('remove', state.phrases.filter(phrase => phrase.id != data))
    },
    toggleAutomated ({ commit }) {
      commit('toggleAutomated')
    },
    setURL ({ commit }, data) {
      commit('setURL', data)
    },
  },
}
