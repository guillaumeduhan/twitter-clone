export default class User {
  constructor(data) {
    this.color = data.color
    this.follow = []
    this.followers = []
    this.id = data.id
    this.mail = data.mail
    this.retweets = []
    this.username = data.username
  }
}
