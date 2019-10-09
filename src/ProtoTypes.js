const { Message } = require("discord.js")
const emotes = require("./resource/emotes.json")
module.exports = class ProtoTypes {
  static start() {
    Message.prototype.cocoaReply = function send(msg) {
      this.channel.send(`${this.author.username}, ${msg}.`)
    }
  }
}
