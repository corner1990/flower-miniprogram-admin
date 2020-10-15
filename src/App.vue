<template>
  <div id="app">
    <Layout/>
  </div>
</template>

<script>
import Layout from './pages/layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
body, html{
  width: 100%;
  height: 100%;
  padding:0%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
