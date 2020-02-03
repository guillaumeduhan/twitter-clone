<template lang="html">
  <div class="loader">
    <img id="loader" :src="loader" alt="loader">
  </div>
</template>

<script>
import loader from '../assets/icons/loader.png'

export default {
  name: 'Loader',
  data() {
    return {
      loader
    }
  }
}
</script>

<style lang="scss" scoped>
.loader {
  #loader {
    max-width: 30px;
    -webkit-animation-name: spin;
    -webkit-animation-duration: 1000ms;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    -moz-animation-name: spin;
    -moz-animation-duration: 1000ms;
    -moz-animation-iteration-count: infinite;
    -moz-animation-timing-function: linear;
    -ms-animation-name: spin;
    -ms-animation-duration: 1000ms;
    -ms-animation-iteration-count: infinite;
    -ms-animation-timing-function: linear;
    -o-transition: rotate(360deg);
  }
}

@-moz-keyframes spin {
  from { -moz-transform: rotate(0deg); }
  to { -moz-transform: rotate(360deg); }
}

@-webkit-keyframes spin {
  from { -webkit-transform: rotate(0deg); }
  to { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
