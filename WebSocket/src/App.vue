<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from './views/layout'
export default {
  name: 'app',
  components: {
    layout
  }
}
</script>

<style>
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
