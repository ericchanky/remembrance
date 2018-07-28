import Vue from 'vue'
import Vuex from 'vuex'
import Vuikit from 'vuikit'
import VuikitIcons from '@vuikit/icons'
import '@vuikit/theme'

import createStore from './store'

import './app.sass'

import Layout from './components/Layout'

Vue.use(Vuex)
Vue.use(Vuikit)
Vue.use(VuikitIcons)

const store = createStore()

new Vue({
  el: '#app',
  store,
  render: createElem => createElem(Layout),
})
