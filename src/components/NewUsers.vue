<template lang="html">
  <div id="NewUsers">
    <h5>New users</h5>
    <UserCard v-for="(user, index) in users.slice(0,10)" :key="index" :userContent="user" />
  </div>
</template>

<script>
import UserCard from './UserCard.vue'
import firebaseFunctions from '../services/firebaseFunctions.js'

export default {
  name: 'NewUsers',
  components: {
    UserCard
  },
  data() {
    return {
      firebaseFunctions,
      users: []
    }
  },
  methods: {
    fetchUsers() {
      this.firebaseFunctions.fetchUsers()
      .then((data) => {
        data.forEach(doc => {
          this.users.push(doc.data())
        });
      })
    }
  },
  mounted() {
    this.fetchUsers()
  }
}
</script>

<style lang="scss" scoped>
#NewUsers {
  border-radius: 5px;
  margin-bottom: 30px;
  width: 100%;

  h5 {
    margin-bottom: 20px;
  }
}
</style>
