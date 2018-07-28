<template>
  <div class="phrase uk-container">
    <div class="uk-inline uk-margin uk-width-1-1">
      <vk-icon-link
        :icon="icon"
        class="uk-form-icon uk-form-icon-flip"
        @click="fetch" />
      <input
        :value="url"
        class="uk-input"
        type="text"
        placeholder="Fetch phrase from..."
        @input="changeURL"
        @keyup.enter="fetch"
      >
    </div>
    <div class="uk-margin">
      <label>
        <input
          :checked="automated"
          type="checkbox"
          @input="toggleAutomated" >
        Automated
        <vk-label>Last update: {{ last_updated_at }}</vk-label>
      </label>
    </div>
    <div>
      <ul>
        <li
          v-for="data in phrases"
          :key="data.id">
          <div class="uk-grid uk-margin">
            <label
              v-if="!automated"
              class="uk-width-auto">
              <vk-icon-button
                icon="trash"
                @click="remove(data.id)" />
            </label>
            <label class="uk-width-expand">
              <input
                :value="data.phrase"
                :disabled="automated"
                class="uk-input"
                type="text"
                @input="evt => update(data, { phrase: evt.target.value })"
              >
            </label>
            <label class="uk-width-auto">
              <input
                :value="data.author"
                :disabled="automated"
                class="uk-input"
                type="text"
                @input="evt => update(data, { author: evt.target.value })"
              >
            </label>
          </div>
        </li>
      </ul>
      <vk-icon-button
        v-if="!automated"
        icon="plus"
        @click="add" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { iconButton, label } from 'vuikit'
import moment from 'moment'


import { fetchPhrase } from '../../utils/fetch'

export default {
  components: { VKIconButton: iconButton, VKLabel: label },
  data () {
    return {
      fetching: false,
    }
  },
  computed: {
    ...mapState('phrase', ['phrases', 'url', 'automated', 'updated_at']),
    icon () {
      return this.fetching ? 'more' : 'refresh'
    },
    last_updated_at () {
      return moment(this.updated_at).format('lll')
    },
  },
  methods: {
    fetch () {
      this.$store.dispatch('phrase/clear')
      this.fetching = true
      fetchPhrase(this.url)
        .then(phrases => phrases.forEach(phrase => this.$store.dispatch('phrase/add', phrase)))
        .then(() => this.fetching = false)
    },
    add () {
      this.$store.dispatch('phrase/add', { phrase: '', author: '' })
    },
    remove (id) {
      this.$store.dispatch('phrase/remove', id)
    },
    update (data, update) {
      this.$store.dispatch('phrase/update', Object.assign({}, data, update))
    },
    changeURL (evt) {
      this.$store.dispatch('phrase/setURL', evt.target.value)
    },
    toggleAutomated () {
      this.$store.dispatch('phrase/toggleAutomated')
    },
  },
}
</script>
