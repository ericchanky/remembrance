import { routes } from '../router'

export default {
  namespaced: true,
  state: {
    route: routes[0],
  },
  mutations: {
    goto (state, data) {
      state.route = data
    },
  },
  actions: {
    goto ({ commit }, data) {
      commit('goto', data)
    },
  },
}
