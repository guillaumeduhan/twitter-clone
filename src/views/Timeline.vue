<template lang="html">
  <div class="Timeline">
    <p v-if="!getTweets.length">No tweet yet.</p>
    <Tweet v-else v-for="(tweet, index) in getTweets" :key="index" :content="tweet" />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Tweet from '../components/Tweet.vue'

export default {
  name: 'Timeline',
  components: {
    Tweet
  },
  computed: {
    ...mapGetters(["getUserModel", "getTweets"])
  },
}
</script>

<style lang="scss" scoped>
.Timeline {

}
</style>
