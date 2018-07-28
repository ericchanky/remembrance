<template>
  <main class="container">
    <Nav />
    <Router />
  </main>
</template>

<script>
import Nav from './nav'
import Router from './router'
import './style'

export default {
  components: { Nav, Router },
}
</script>
