<template lang="html">
  <div class="sidebar d-flex flex-column align-items-start justify-content-start">
    <div class="logo d-flex flex-column align-items-start justify-content-start">
      <img :src="TwitterLogo" alt="Twitter" id="TwitterLogo" />
    </div>
    <ul class="nav--menu">
      <li class="list--item" v-for="navItem, index in navList" :key="index" @click="goTo(navItem.link)">{{ navItem.name }}</li>
    </ul>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import TwitterLogo from '../assets/twi.png'

export default {
  name: 'Sidebar',
  computed: {
    ...mapGetters(["getUserModel"])
  },
  data() {
    return {
      navList: [
        {
          name: "Home",
          link: "/timeline"
        }, {
          name: "Profile",
          link: "/profile/"
        }
      ],
      TwitterLogo
    }
  },
  methods: {
    goTo(link) {
      if (link === "/profile/") {
        this.$router.push({
          name: "Profile",
          params: {
            id: this.getUserModel.id
          }
        }).catch((err) => {})
      } else {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  .logo {
    width: 100%;
    margin: 30px 0;
  }

  #TwitterLogo {
    width: 40px;
  }

  .nav--menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    cursor: pointer;

    .list--item {
      font-size: 25px;
      font-weight: 900;
      margin: 0;
      padding: 0;

      &:hover {
        color: $lapis;
        transition: .25s;
      }
    }
  }
}
</style>
