<template>
  <div class="wallpaper-form uk-margin">
    <div class="uk-margin">
      <Dropzone :upload="addWallpaper" />
    </div>
    <div class="uk-inline uk-margin uk-width-1-1">
      <vk-icon-link
        :icon="icon"
        class="uk-form-icon uk-form-icon-flip"
        @click="fetchURL" />
      <input
        v-model="imageURL"
        class="uk-input"
        placeholder="Paste URL here..."
        @keyup.enter="fetchURL"
      >
    </div>
    <label>
      <input
        :checked="overlay"
        type="checkbox"
        @input="toggleOverlay" >
      Overlay
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { iconLink } from 'vuikit'
import axios from 'axios'

import Dropzone from '../../components/Dropzone'
import imageProcessor from '../../utils/image_processor'

export default {
  components: { Dropzone, VKIconLink: iconLink },
  data () {
    return {
      imageURL: '',
      fetching: false,
    }
  },
  computed: {
    ...mapState('wallpaper', ['overlay']),
    icon () {
      return this.fetching ? 'more' : 'upload'
    },
  },
  methods: {
    addWallpaper (files, progress) {
      return imageProcessor(files, progress)
        .then((images) => images.forEach(image => this.$store.dispatch('wallpaper/add', image)))
    },
    toggleOverlay () {
      this.$store.dispatch('wallpaper/toggleOverlay')
    },
    fetchURL (evt) {
      evt.preventDefault()

      if (this.imageURL === '') return

      this.fetching = true

      return axios.get(this.imageURL, { responseType: 'blob' })
        .then(res => this.addWallpaper([res.data]))
        .then(() => {
          this.imageURL = ''
          this.fetching = false
        })
        .catch(() => {
          this.fetching = false
        })
    },
  },
}
</script>

