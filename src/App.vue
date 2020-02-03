<template lang="html">
  <div id="app" class="container d-flex justify-content-center align-items-top">
    <div class="col-2">
      <Sidebar v-if="$route.meta.sidebar" />
    </div>
    <div class="col-7">
      <router-view />
    </div>
    <div class="col-3">
      <NewUsers v-if="$route.meta.sidebar" />
    </div>
  </div>
</template>

<script>
import NewUsers from './components/NewUsers.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    NewUsers,
    Sidebar,
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2C3E50;
  margin: 30px auto;

  p {
    margin: 0;
  }
}
</style>
