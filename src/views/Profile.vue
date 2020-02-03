<template lang="html">
  <div id="profile">
    <p v-if="!userModel">No user profile has been found.</p>
    <div v-else class="container">
      <header>

        <div class="logo">
            <div class="thumbnail d-flex align-items-center justify-content-center" :style="{ backgroundColor: userModel.color }">
            <p>{{ userModel.username | letterGenerator }}</p>
          </div>
        </div>

        <div class="infos d-flex flex-column align-items-left text-left">
          <p class="username">@{{ userModel.username }}</p>
        </div>

        <div class="follow--count d-flex flex-row align-items-left text-left" @click="pushToFollowing">
          <p class="following cta">
            <span>{{ userModel.follow.length }}</span>
            Follow
          </p>
          <p class="followers cta">
            <span>{{ userModel.followers.length }}</span>
            Followers
          </p>
        </div>

        <div v-if="getUserModel && getUserModel.id !== userModel.id" class="buttons--follow">
          <Button v-if="getUserModel.follow && !getUserModel.follow.includes(userModel.id)" title="Follow" class="text-left" @click.native="followUser" />
          <Button v-else title="Unfollow" class="text-left" @click.native="unfollowUser" />
        </div>

        <Button v-if="getUserModel.id === userModel.id" title="Logout" class="text-left" @click.native="logout" />

      </header>

      <div class="tweets--content">

        <div v-if="!following" class="tweet--timeline">
          <TweetGenerator v-if="getUserModel.id === userModel.id" @update="fetchTweets(userModel.username)" />
          <Loader v-if="loading" />
          <div class="tweet--line">
            <Tweet v-if="userModel.username === tweet.username" v-for="(tweet, index) in tweetsList" :key="index" :content="tweet" />
          </div>
        </div>

        <Followers v-else :follow="getUserModel.follow" :followers="getUserModel.followers"/>

      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import Button from '../components/Button.vue'
import Followers from '../components/Followers.vue'
import Loader from '../components/Loader.vue'
import Tweet from '../components/Tweet.vue'
import TweetGenerator from '../components/TweetGenerator.vue'
import firebaseFunctions from '../services/firebaseFunctions.js'

export default {
  name: "Profile",
  components: {
    Button,
    Followers,
    Loader,
    Tweet,
    TweetGenerator
  },
  data() {
    return {
      firebaseFunctions,
      following: false,
      loading: false,
      tweetsList: [],
      userModel: undefined,
    }
  },
  computed: {
    ...mapGetters(["getUserModel"])
  },
  methods: {
    fetchTweets(username) {
      this.loading = true
      this.firebaseFunctions.getTweets(username)
      .then((tweets) => {
        tweets.forEach((tweet) => {
          if (!this.tweetsList.find(tweetStored => tweetStored.id === tweet.id)) {
            this.tweetsList.push(tweet.data())
          }
        })
        this.loading = false
      })
    },
    fetchUserProfile() {
      this.loading = true
      this.firebaseFunctions.getUser(this.$route.params.id)
      .then((user) => {
        if (user.exists) {
          let userData = user.data()
          this.userModel = userData
          this.fetchTweets(userData.username)
          this.loading = false
        }
      })
    },
    followUser() {
      this.$store.dispatch('followUser', {
        userId: this.getUserModel.id,
        toFollow: this.userModel.id
      })
      this.userModel.followers.push(this.getUserModel.id)
    },
    unfollowUser() {
      this.$store.dispatch('unfollowUser', {
        userId: this.getUserModel.id,
        toFollow: this.userModel.id
      })
      this.userModel.followers.splice(this.getUserModel.id)
    },
    logout() {
      this.$store.dispatch('logOut')
    },
    pushToFollowing() {
      this.following = !this.following
    }
  },
  watch: {
    '$route.params.id': function (id) {
      if (id) {
        this.fetchUserProfile()
      }
    },
  },
  mounted(){
    this.fetchUserProfile()
  }
}
</script>

<style lang="scss" scoped>
#profile {
  width: 100%;

  header {
    border: 1px solid #DDD;
    padding: 15px;
    margin-bottom: 30px;

    .logo {
      max-width: 100px;
      overflow: hidden;
      border-radius: 50px;
      border: 2px solid white;

      .thumbnail {
        width: 80px;
        height: 80px;
        border-radius: 50px;
        font-size: 40px;
        color: white;
      }
    }

    .infos {
      .username {
        color: $lapis;
        font-size: 22px;
        font-weight: bold;
      }
    }

    .follow--count {
      margin: 15px 0;

      .followers,
      .following {
        margin-right: 10px;

        span {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
