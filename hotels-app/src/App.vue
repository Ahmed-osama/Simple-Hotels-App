<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>
<script>

import header from './components/shared/header.componenet.vue'
export default {
  name: 'App',
  components: {
    'app-header': header
  }
}
</script>

<style>

</style>
