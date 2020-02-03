<template lang="html">
  <div class="tweet-view">
    <p v-if="!tweetData">No tweet found.</p>
    <div v-else class="container">
      <Tweet :content="tweetData" />
      <Tweet v-for="(tweet, index) in tweetData.answers" :key="index" :content="tweet" />
    </div>
  </div>
</template>

<script>
import Tweet from '../components/Tweet.vue'
import firebaseFunctions from '../services/firebaseFunctions.js'

export default {
  name: 'TweetView',
  components: {
    Tweet
  },
  data() {
    return {
      tweetData: undefined,
      firebaseFunctions
    }
  },
  methods: {
    fetchTweet() {
      this.firebaseFunctions.getTweet(this.$route.params.id)
      .then((tweet) => {
        this.tweetData = tweet.data()
      })
    }
  },
  mounted() {
    this.fetchTweet()
  }
}
</script>

<style lang="scss" scoped>
.tweet-view {}
</style>
