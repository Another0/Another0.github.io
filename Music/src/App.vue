<template>
  <div id="app">
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
    <vfooter></vfooter>
  </div> 
</template>

<script>
import vfooter from './components/footer'
import vindex from './components/index'

export default {
  name: 'app',
  components: {
    vfooter,
    vindex
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}

html {
  width: 100%;
  height: 100%;
}

img {
  padding: 0;
  margin: 0;
}

#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clearFloat:after {
  content: '';
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
</style>
