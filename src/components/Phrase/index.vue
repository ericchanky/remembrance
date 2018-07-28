<template>
  <div class="phrase">
    <pre>{{ formattedPhrase }}</pre>
    <pre v-if="showAuthor">-- {{ author }} --</pre>
  </div>
</template>

<script>
import './style'

export default {
  props: {
    phrase: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
  },
  computed: {
    formattedPhrase() {
      return this.phrase.substring().replace(/[。；;]/g, char => `${char}\n`).replace(/\n$/, '')
    },
    showAuthor() {
      return this.author !== ''
    },
  },
}
</script>

