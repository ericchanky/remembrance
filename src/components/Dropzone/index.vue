<template>
  <div
    :class="{active}"
    class="dropzone"
    @drop="onDrop"
    @dragover="onDragActive"
    @dragenter="onDragActive"
    @dragleave="onDrageInactive"
    @dragend="onDrageInactive"
  >
    <label for="wallpaper-upload">
      <span v-if="processing">Processing... {{ finished }} / {{ total }}</span>
      <span v-else>Drag one or more files to this Drop Zone ...</span>
      <input
        id="wallpaper-upload"
        type="file"
        multiple
        @change="selectFiles" >
    </label>
  </div>
</template>

<script>
import './style'

export default {
  props: {
    upload: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      active: false,
      processing: false,
      finished: 0,
      total: 0,
    }
  },
  methods: {
    uploadWithProgress (files) {
      this.total = files.length

      return this.upload(files, () => {
        this.processing = true
        this.finished += 1
      })
        .then(() => {
          this.processing = false
          this.finished = 0
        })
    },
    selectFiles (evt) {
      evt.preventDefault()
      this.uploadWithProgress(evt.target.files).then(() => evt.target.value = '')
    },
    onDrop (evt) {
      this.onDrageInactive(evt)
      this.uploadWithProgress(evt.dataTransfer.files).then(() => evt.dataTransfer.value = '')
    },
    onDragActive (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.active = true
    },
    onDrageInactive (evt) {
      evt.preventDefault()
      evt.stopPropagation()
      this.active = false
    },
  },
}
</script>

