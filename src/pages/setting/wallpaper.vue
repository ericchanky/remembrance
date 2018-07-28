<template>
  <div class="wallpaper uk-container">
    <WallpaperForm />
    <WallpaperList />
  </div>
</template>

<script>
import WallpaperList from './wallpaper_list'
import WallpaperForm from './wallpaper_form'

export default {
  components: { WallpaperList, WallpaperForm },
}
</script>
