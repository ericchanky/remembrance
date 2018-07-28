<template>
  <section id="page-phrase">
    <Wallpaper
      :image="wallpaper"
      :overlay="overlay" />
    <Phrase
      :phrase="phrase.phrase"
      :author="phrase.author" />
  </section>
</template>

<script>
import { mapState } from 'vuex'

import Phrase from '../../components/Phrase'
import Wallpaper from '../../components/Wallpaper'
import './style'

export default {
  components: { Phrase, Wallpaper },
  computed: {
    ...mapState('wallpaper', ['wallpaper', 'overlay']),
    ...mapState('phrase', ['phrase']),
  },
  created() {
    this.$store.dispatch('wallpaper/show')
    this.$store.dispatch('phrase/show')
    this.$store.dispatch('phrase/automate')
  },
}
</script>
