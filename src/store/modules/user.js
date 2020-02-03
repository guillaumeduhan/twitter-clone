import _ from 'lodash'
import { default as User } from '../../models/user'
import { default as Tweet } from '../../models/tweet'
import { getRandomColor, idGenerator } from '../../services/helpers'
import router from '../../router/index'
import firebaseFunctions from '../../services/firebaseFunctions'

const state = {
  color: undefined,
  follow: undefined,
  followers: undefined,
  id: undefined,
  mail: undefined,
  username: undefined,
}

const mutations = {
  CLEAR_PROFILE(state) {
    _.forEach(state, (value, key) => {
      state[key] = undefined
    })
  },
  SET_PROFILE(state, payload) {
    state.color = payload.color
    state.follow = payload.follow
    state.followers = payload.followers
    state.id = payload.id
    state.mail = payload.mail
    state.username = payload.username
  },
  ADD_FOLLOW(state, payload) {
    state.follow.push(payload)
  },
  REMOVE_FOLLOW(state, payload) {
    state.follow.splice(payload)
  },
}

const getters = {
  getUserModel: (state) => state,
}

const actions = {
  answerTweet({ commit }, payload) {
    const newTweet = new Tweet({
      color: state.color,
      date: new Date(),
      id: idGenerator(),
      message: payload.message,
      username: state.username,
    })
    firebaseFunctions.answerTweet(payload.tweetId, newTweet)
  },
  createUserAndStoreData({ commit }, payload) {
    firebaseFunctions.createUser(payload.mail, payload.password)
    .then((data) => {
      const newUser = new User({
        color: getRandomColor(),
        id: data.user.uid,
        mail: data.user.email,
        username: payload.username,
      })
      firebaseFunctions.saveUser(newUser)
      .then(() => {
        commit('SET_PROFILE', newUser)
        router.push(`/profile/${newUser.id}`).catch((err) => {})
      })
    })
  },
  followUser({ commit }, payload) {
    firebaseFunctions.followUser(payload.userId, payload.toFollow)
    commit('ADD_FOLLOW', payload.toFollow)
  },
  unfollowUser({ commit }, payload) {
    firebaseFunctions.unfollowUser(payload.userId, payload.toFollow)
    commit('REMOVE_FOLLOW', payload.toFollow)
  },
  login({ commit }, payload) {
    firebaseFunctions.login(payload.mail, payload.password)
    .then((data) => {
      firebaseFunctions.getUser(data.user.uid)
      .then((user) => {
        commit('SET_PROFILE', user)
        router.push(`/profile/${user.id}`).catch((err) => {})
      })
    })
  },
  logOut({ commit }, payload) {
    firebaseFunctions.signOut()
    .then(() => {
      commit('CLEAR_PROFILE')
      router.push('/login')
    })
  },
  setLikeToTweet({ commit }, payload) {
    firebaseFunctions.likeTweet(payload.tweetId, payload.userId)
  },
  setRetweet({ commit }, payload) {
    firebaseFunctions.retweet(payload.tweetId, payload.userId)
  },
  setProfileToStore({ commit, dispatch }, payload) {
    commit('SET_PROFILE', payload)
    dispatch('fetchTweetsToTimeline', {
      username: payload.username,
    })
    _.forEach(payload.follow, (followId) => {
      dispatch('fetchTweetsToTimeline', {
        userId: followId,
      })
    })
  },
  sendTweet({ commit }, message) {
    const newTweet = new Tweet({
      color: state.color,
      date: new Date(),
      id: idGenerator(),
      message,
      userId: state.id,
      username: state.username,
    })
    firebaseFunctions.saveTweet(newTweet)
  },
}

export default {
  state,
  mutations,
  getters,
  actions,
}
