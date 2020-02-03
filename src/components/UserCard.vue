<template lang="html">
  <div class="user--card d-flex flex-row justify-content-left align-items-center" @click="goToProfile(userContent.id)">
    <div class="user--card__image thumbnail d-flex align-items-center justify-content-center" :style="{ backgroundColor: userContent.color }">
      <p>{{ userContent.username | letterGenerator }}</p>
    </div>
    <div class="user--card__username text-left">
      <p class="username">{{ userContent.username }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    userContent: Object
  },
  methods: {
    goToProfile() {
      this.$router.push(`/profile/${this.userContent.id}`).catch(err => {})
      this.$emit('closeFollow')
    }
  }
}
</script>

<style lang="scss" scoped>
.user--card {
  max-width: 600px;
  border: 1px solid #DDD;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background: #EEE;
  }

  img {
    max-width: 50px;
    height: auto;
    margin-right: 10px;
  }

  .thumbnail {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    font-size: 30px;
    color: white;
  }
}
</style>
