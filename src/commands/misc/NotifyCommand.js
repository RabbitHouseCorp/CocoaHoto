const { Command, config } = require('../../utils')

module.exports = class NotifyCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'notify',
      aliases: ['notificar']
    })
  }

  run(message, args) {
    if (message.member.roles.includes(config.NOTIFY_ROLE_ID)) {
      message.member.removeRole(config.NOTIFY_ROLE_ID).then(() => {
        message.channel.createMessage(`${message.author.mention}, you will no longer receive Chino news`)
      })
    } else {
      message.member.addRole(config.NOTIFY_ROLE_ID).then(() => {
        message.channel.createMessage(`${message.author.mention}, now you will receive more news from Chino`)
      })
    }
  }
}
