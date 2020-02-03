export default class Tweet {
  constructor(data) {
    this.answers = []
    this.color = data.color
    this.date = data.date
    this.id = data.id
    this.likes = []
    this.message = data.message
    this.retweets = []
    this.userId = data.userId
    this.username = data.username
  }
}
