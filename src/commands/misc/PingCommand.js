const { Command } = require('../../utils')

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      aliases: [],
      category: 'misc',
      userPermission: [],
      clientPermission: [],
      onlyDevs: false
    })
  }

  async run(message, args) {
    let msg = await message.channel.createMessage(':ping_pong:')
    msg.edit(`Pong! :ping_pong: \`${Math.round(message.channel.guild.shard.latency)}\`ms.`)
  }
}
