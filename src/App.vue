<template>
  <div id="app">
    <weather />
  </div>
</template>

<script>
import weather from './components/weather/weather.vue';

export default {
  name: 'App',
  components: {
    weather
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
