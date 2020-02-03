const firebase = require('firebase')
// const store = require('../store/index.js')
const _ = require('lodash')
const { db } = require('./db.js')

/*
  * Authentication
  */

const createUser = async (mail, password) => {
  return firebase
  .auth()
  .createUserWithEmailAndPassword(mail, password)
}

const login = async (mail, password) => {
  return firebase
  .auth()
  .signInWithEmailAndPassword(mail, password)
}

const signOut = async () => {
  return firebase
  .auth()
  .signOut()
}

const getUser = async (userId) => {
  return db
  .collection('users')
  .doc(userId)
  .get()
}

const fetchUsers = async () => {
  return db
  .collection('users')
  .get()
}

/*
  * Firestore
  */

const addFollowerToUser = async (toFollow, userId) => {
  return getUser(toFollow)
  .then((user) => {
    const followersArray = user.data().followers

    if (!followersArray.includes(userId)) {
      followersArray.push(userId)
      return db
      .collection('users')
      .doc(toFollow)
      .update({
        followers: followersArray,
      })
    }
  })
}

const removeFollowerToUser = async (toFollow, userId) => {
  return getUser(toFollow)
  .then((user) => {
    const followersArray = user.data().followers

    if (followersArray.includes(userId)) {
      followersArray.splice(userId)
      return db
      .collection('users')
      .doc(toFollow)
      .update({
        followers: followersArray,
      })
    }
  })
}

const followUser = async (userId, toFollow) => {
  return getUser(userId)
  .then((user) => {
    const followArray = user.data().follow

    if (!followArray.includes(toFollow)) {
      followArray.push(toFollow)
      return db
      .collection('users')
      .doc(userId)
      .update({
        follow: followArray,
      })
      .then(() => {
        addFollowerToUser(toFollow, userId)
      })
    }
  })
}

const unfollowUser = async (userId, toFollow) => {
  return getUser(userId)
  .then((user) => {
    const followArray = user.data().follow

    if (followArray.includes(toFollow)) {
      followArray.splice(toFollow)
      return db
      .collection('users')
      .doc(userId)
      .update({
        follow: followArray,
      })
      .then(() => {
        removeFollowerToUser(toFollow, userId)
      })
    }
  })
}

const saveUser = async (newUser) => {
  return db
  .collection('users')
  .doc(newUser.id)
  .set({ ...newUser })
}

const saveTweet = async (newTweet) => {
  return db
  .collection('tweets')
  .doc(newTweet.id)
  .set({ ...newTweet })
}

const getTweet = async (tweetId) => {
  return db
  .collection('tweets')
  .doc(tweetId)
  .get()
}

const getTweets = async (username, userId) => {
  const type = username ? 'username' : 'userId'
  const option = username ? username : userId
  return db
  .collection('tweets')
  .where(type, '==', option)
  .get()
}

const updateUserRetweets = async (userId, tweetId) => {
  return db
  .collection('users')
  .doc(userId)
  .get()
  .then((user) => {
    const retweetsArray = user.data().retweets

    if (!retweetsArray.includes(tweetId)) {
      retweetsArray.push({ ...tweetId })
      return db
      .collection('users')
      .doc(userId)
      .update({
        retweets: retweetsArray,
      })
    }
  })
}

const answerTweet = async (tweetId, tweetAnswer) => {
  return db
  .collection('tweets')
  .doc(tweetId)
  .get()
  .then((tweet) => {
    const answersArray = tweet.data().answers // get the existing Array of answers
    answersArray.push({ ...tweetAnswer }) // push our Tweet answer to existing answers

    return db
    .collection('tweets')
    .doc(tweetId)
    .update({
      answers: answersArray,
    })
  })
}

const retweet = async (tweetId, userId) => {
  return db
  .collection('tweets')
  .doc(tweetId)
  .get()
  .then((tweet) => {
    const retweetsArray = tweet.data().retweets // get the existing Array of retweets

    if (!retweetsArray.includes(userId)) {
      retweetsArray.push(userId) // push our Tweet answer to existing retweets
      return db
      .collection('tweets')
      .doc(tweetId)
      .update({
        retweets: retweetsArray,
      })
      .then(() => {
        updateUserRetweets(userId, tweetId)
      })
    }
  })
}

const likeTweet = async (tweetId, userId) => {
  return db
  .collection('tweets')
  .doc(tweetId)
  .get()
  .then((tweet) => {
    const likesArray = tweet.data().likes

    if (!likesArray.includes(userId)) {
      likesArray.push(userId)
      return db
      .collection('tweets')
      .doc(tweetId)
      .update({
        likes: likesArray,
      })
    }
  })
}

export default {
  answerTweet,
  createUser,
  fetchUsers,
  followUser,
  getTweet,
  getTweets,
  getUser,
  likeTweet,
  login,
  retweet,
  saveTweet,
  saveUser,
  signOut,
  unfollowUser,
}
