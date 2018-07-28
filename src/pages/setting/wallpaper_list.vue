<template>
  <vk-grid class="wallpaper-list uk-flex uk-flex-center">
    <div 
      v-for="image in list" 
      :key="image.id">
      <vk-card padding="small">
        <div 
          :style="{ backgroundImage: `url(${image.url})` }" 
          class="image"/>
        <div 
          slot="footer" 
          class="footer">
          <vk-icon 
            icon="trash" 
            @click="remove(image.id)" />
        </div>
      </vk-card>
    </div>
  </vk-grid>
</template>

<script>
import { mapState } from 'vuex'
import { grid, card, icon } from 'vuikit'

export default {
  components: {
    VKGrid: grid,
    VKCard: card,
    VKIcon: icon,
  },
  computed: {
    ...mapState('wallpaper', ['list']),
  },
  methods: {
    remove (id) {
      this.$store.dispatch('wallpaper/remove', id)
    },
  },
}
</script>
