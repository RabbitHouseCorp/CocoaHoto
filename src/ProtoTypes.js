const { Message } = require("discord.js")
module.exports = class ProtoTypes {
  static start() {
    Message.prototype.cocoaReply = function send(msg) {
      this.channel.send(`${this.author.username}, ${msg}.`)
    }
  }
}
