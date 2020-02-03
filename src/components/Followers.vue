<template lang="html">
  <div id="followers">
    <div class="follow--content d-flex align-items-top justify-content-between">
      <div class="followers col-6">
        <h3>You follow</h3>
        <UserCard v-for="(user, index) in followArray.slice(0,10)" :key="index" :userContent="user" />
      </div>
      <div class="followers col-6">
        <h3>Followers</h3>
        <UserCard v-for="(user, index) in followersArray.slice(0,10)" :key="index" :userContent="user" />
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from './UserCard.vue'
import firebaseFunctions from '../services/firebaseFunctions.js'

export default {
  name: 'Followers',
  props: {
    follow: Array,
    followers: Array,
  },
  components: {
    UserCard
  },
  data() {
    return {
      firebaseFunctions,
      followArray: [],
      followersArray: []
    }
  },
  methods: {
    // Work on displaying profile's followers and not user
    fetchUsers() {
      if (this.follow) {
        _.forEach(this.follow, (userId) => {
          firebaseFunctions.getUser(userId)
          .then((userData) => {
            this.followArray.push(userData.data())
          })
        })
      }
      if (this.followers) {
        _.forEach(this.followers, (userId) => {
          firebaseFunctions.getUser(userId)
          .then((userData) => {
            this.followersArray.push(userData.data())
          })
        })
      }
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>

<style lang="scss" scoped>
#followers {
  min-width: 100%;
}
</style>
