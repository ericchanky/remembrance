<template>
  <div class="wallpaper">
    <div
      :style="{ backgroundImage }"
      class="layer" />
    <div
      v-if="overlay"
      :style="{ background }"
      class="layer" />
  </div>
</template>

<script>
import './style'
import { randInt, randRGBA } from '../../utils/rand'

export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    backgroundImage() {
      return `url(${this.image})`
    },
    background() {
      return `linear-gradient(${randInt(360)}deg, rgba(${randRGBA(0.86)}) 14%, rgba(${randRGBA(0.25)}) 47%, rgba(${randRGBA(0.186)}) 54%, rgba(${randRGBA(0.93)}) 82%) rgba(0, 0, 0, 0.32)`
    },
  },
}
</script>
