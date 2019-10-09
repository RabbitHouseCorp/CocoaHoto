const Command = require("../../src/structures/Command")
module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      aliases: [],
      category: "misc",
      userPermission: [],
      clientPermission: [],
      onlyDevs: false
    })
  }

  async run(message, args) {
    let msg = await message.channel.send(":ping_pong:")
    msg.edit(`Pong! :ping_pong: \`${Math.round(this.client.ws.ping)}\`ms.`)
  }
}
