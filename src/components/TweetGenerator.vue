<template lang="html">
  <div id="TweetGenerator">
    <textarea name="name" rows="8" cols="80" placeholder="What's happening ?" v-model="message"></textarea>
    <Button title='Tweet' @click.native="sendTweet" />
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'TweetGenerator',
  components: {
    Button
  },
  props: {
    answerId: String
  },
  data() {
    return {
      message: undefined,
    }
  },
  methods: {
    sendTweet() {
      if (this.answerId) {
        this.$store.dispatch('answerTweet', {
          message: this.message,
          tweetId: this.answerId
        })
      } else {
        this.$store.dispatch('sendTweet', this.message)
      }
      this.message = undefined
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
#TweetGenerator {
  border: 1px solid #DDD;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;

  textarea {
    width: 100%;
    outline: none;
    max-height: 60px;
    border: 0;
    font-size: 22px;
  }
}
</style>
