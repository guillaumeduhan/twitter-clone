<template lang="html">
  <div id="Home">
    <h1>hello world</h1>
  </div>
</template>

<script>
import Tweet from '../models/tweet.js'
import User from '../models/user.js'

export default {
  name: 'Home',
  data() {
    return {
      Tweet,
      User
    }
  },
  mounted() {
    // let newUser = new User({ username: 'Guillaume' });
    // let newTweet = new Tweet({ username: 'Guillaume' });
    // console.log(newUser)
    // console.log(newTweet)
  }
}
</script>

<style lang="scss">
#Home {}
</style>
