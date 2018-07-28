<template>
  <vk-iconnav id="main-nav">
    <vk-iconnav-item
      v-for="route in routes"
      :key="route.name"
      :icon="route.icon"
      :active="isActive(route)"
      @click="changePage(route)"
    />
  </vk-iconnav>
</template>

<script>
import { iconnav, iconnavItem } from 'vuikit'
import { mapState } from 'vuex'
import { routes } from '../../router'

export default {
  components: {
    VKIconnav: iconnav,
    VKIconnavItem: iconnavItem,
  },
  data() {
    return { routes }
  },
  computed: {
    ...mapState('route', ['route']),
  },
  methods: {
    isActive(route) {
      return this.route.name === route.name
    },
    changePage(route) {
      this.$store.dispatch('route/goto', route)
    },
  },

}
</script>
