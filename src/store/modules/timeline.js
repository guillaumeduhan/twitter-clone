import _ from 'lodash'
import firebaseFunctions from '../../services/firebaseFunctions'

const state = {
  tweets: []
}

const mutations = {
  SET_TWEET_TO_STORE(state, tweet) {
    state.tweets.push(tweet)
  }}

const getters = {
  getTweets: (state) => state.tweets,
}

const actions = {
  fetchTweetsToTimeline({ commit }, payload) {
    const myTweetsPromise = payload.username ? firebaseFunctions.getTweets(payload.username) : firebaseFunctions.getTweets('', payload.userId)
    return Promise.all([myTweetsPromise])
    .then(response => {
      _.forEach(response, (snapshot) => {
        snapshot.forEach(tweet => {
          commit('SET_TWEET_TO_STORE', tweet.data())
        });
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default {
  state,
  mutations,
  getters,
  actions,
}
