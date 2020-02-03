<template lang="html">
  <div class="tweet">
    <div class="tweet-content d-flex justify-content-left align-items-left flex-row" @click="pushToTweet">
        <div class="user--thumbnail">
          <div class="user--card--thumbnail d-flex align-items-center justify-content-center" :style="{ backgroundColor: content.color }">
            <p>{{ content.username | letterGenerator }}</p>
          </div>
        </div>
        <div class="d-flex justify-content-left align-items-left flex-column">
          <p class="infos text-left">
            <span class="username">{{ content.username }}</span>
            <span class="date"> - {{ content.date.seconds | moment('MMMM Do YYYY, h:mm:ss a') }}</span>
          </p>
          <p class="message text-left">{{ content.message }}</p>
      </div>
    </div>
    <div class="options d-flex justify-content-between align-items-center flex-row">
      <div @click="answerTweet" class="option--image__box d-flex">
        <img class="option--image" :src="answerImg" alt="answer">
        <p v-if="content.answers.length">{{ content.answers.length }}</p>
      </div>
      <div @click="retweetThisTweet" class="option--image__box d-flex">
        <img v-if="content.retweets.includes(getUserModel.id)" class="option--image" :src="retweetFull" alt="rt">
        <img v-else class="option--image" :src="retweet" alt="rt">
        <p v-if="content.retweets.length">{{ content.retweets.length }}</p>
      </div>
      <div @click="likeThisTweet" class="option--image__box d-flex">
        <img v-if="content.likes.includes(getUserModel.id)" class="option--image" :src="fullLike" alt="full like">
        <img v-else class="option--image" :src="like" alt="like">
        <p v-if="content.likes.length">{{ content.likes.length }}</p>
      </div>
    </div>
    <TweetGenerator v-if="answer" :answerId="content.id" />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import answerImg from '../assets/icons/conversation.png'
import like from '../assets/icons/heart.png'
import fullLike from '../assets/icons/heart_full.png'
import retweet from '../assets/icons/retweet.png'
import retweetFull from '../assets/icons/retweet-full.png'
import TweetGenerator from './TweetGenerator.vue'

export default {
  name: 'Tweet',
  computed: {
    ...mapGetters(['getUserModel'])
  },
  data() {
    return {
      answerImg,
      answer: false,
      fullLike,
      like,
      retweet,
      retweetFull
    }
  },
  props: {
    content: Object
  },
  components: {
    TweetGenerator
  },
  methods: {
    answerTweet() {
      this.answer = true
    },
    likeThisTweet() {
      this.$store.dispatch('setLikeToTweet', {
        tweetId: this.content.id,
        userId: this.getUserModel.id,
      })
      if (!this.content.likes.includes(this.getUserModel.id)) {
        this.content.likes.push(this.getUserModel.id)
      }
    },
    pushToTweet() {
      this.$router.push(`/tweet/${this.content.id}`)
    },
    retweetThisTweet() {
      this.$store.dispatch('setRetweet', {
        tweetId: this.content.id,
        userId: this.getUserModel.id,
      })
      if (!this.content.retweets.includes(this.content.id)) {
        this.content.retweets.push(this.content.id)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tweet {
  max-width: 600px;
  border: 1px solid #DDD;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  .tweet-content {
    cursor: pointer;

    .user--thumbnail {
      background: white;
      border-radius: 50px;
      min-width: 60px;
      min-height: 60px;
      max-height: 60px;
      max-width: 60px;
      overflow: hidden;
      margin-right: 20px;

      img {
        max-width: 60px;
      }

      .user--card--thumbnail {
        margin-right: 10px;
        min-width: 60px;
        min-height: 60px;
        max-height: 60px;
        max-width: 60px;
        border-radius: 60px;
        font-size: 30px;
        color: white;
      }
    }

    .username {
      font-weight: bold;
    }

    .date {
      color: $aqua;
      font-weight: bold;
    }

    .message {
      font-size: 18px;
    }
  }

  .options {
    padding: 10px 20px;

    .option--image {
      max-width: 20px;
      margin: 3px;
      cursor: pointer;
    }
  }
}
</style>
