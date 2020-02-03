<template lang="pug">
  <div id="Login">
    <div class="container d-flex flex-column">
      <h1>Welcome to Twitter-clone</h1>
      <div class="login--box signup" v-if="signup">
        <h2>Signup</h2>
        <b-form-input type="email" placeholder="Enter email" v-model="mail"></b-form-input>
        <b-form-input placeholder="Enter a username" v-model="username"></b-form-input>
        <b-form-input type="password" placeholder="Enter password" v-model="password"></b-form-input>
        <b-form-input type="password" placeholder="Confirm password" v-model="confirmPassword"></b-form-input>
        <div class="error" v-if="errorMessage">
          <p class="text-danger">{{ errorMessage }}</p>
        </div>
        <Button title="Signup" @click.native="signUp" />
      </div>
      <div class="login--box login" v-else>
        <h2>Login</h2>
        <b-form-input type="email" placeholder="Enter email" v-model="mail"></b-form-input>
        <b-form-input type="password" placeholder="Enter password" v-model="password"></b-form-input>
        <div class="error" v-if="errorMessage">
          <p class="text-danger">{{ errorMessage }}</p>
        </div>
        <Button title="Login" @click.native="login" />
      </div>
      <div class="options">
        <div class="cta" @click="signup = true">Signup</div>
        <div class="cta" @click="signup = false">Login</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import firebase from 'firebase'
import Button from '../components/Button.vue'
import firebaseFunctions from '../services/firebaseFunctions.js'
import { validateEmail } from '../services/helpers.js'

export default {
  name: 'Login',
  data() {
    return {
      confirmPassword: undefined,
      errorMessage: undefined,
      firebaseFunctions,
      mail: undefined,
      password: undefined,
      signup: true,
      username: undefined
    }
  },
  components: {
    Button
  },
  methods: {
    displayError(error) {
      this.errorMessage = error
      setTimeout(() => {
        this.errorMessage = null
      }, 6000)
    },
    login() {
      if (!validateEmail(this.mail)) {
        this.displayError('Not a regular mail adress. Please, try again.')
      } else {
        this.$store.dispatch('login', {
          mail: this.mail,
          password: this.password
        })
      }
    },
    signUp() {
      if (this.password !== this.confirmPassword) {
        this.displayError('Differents passwords. Please, try again.')
      } else if (this.password.length < 6 || this.confirmPassword < 6) {
        this.displayError('Passwords must superior to 6 characters. Please, try again.')
      } else if (this.username.length < 4) {
        this.displayError('Username must superior to 4 characters. Please, try again.')
      } else if (!validateEmail(this.mail)) {
        this.displayError('Not a regular mail adress. Please, try again.')
      } else {
        this.$store.dispatch('createUserAndStoreData', {
          mail: this.mail,
          password: this.password,
          username: this.username
        })
      }
    },
  },
}
</script>

<style lang="scss">
#Login {
  margin: 50px auto;

  .login--box {
    width: 400px;
    margin: auto;

    input {
      margin: 15px 0;
    }

    button {
      margin: 30px 0;
    }
  }
}
</style>
