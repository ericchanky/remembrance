<template>
  <section id="page-setting">
    <vk-tabs>
      <vk-tabs-item title="Wallpaper">
        <Wallpaper />
      </vk-tabs-item>
      <vk-tabs-item title="Phrase">
        <Phrase />
      </vk-tabs-item>
    </vk-tabs>
  </section>
</template>

<script>
import { tabs, tabsItem } from 'vuikit'
import Wallpaper from './wallpaper'
import Phrase from './phrase'
import './style'

export default {
  components: {
    VKTabs: tabs,
    VKTabsItem: tabsItem,
    Wallpaper,
    Phrase,
  },
}
</script>
