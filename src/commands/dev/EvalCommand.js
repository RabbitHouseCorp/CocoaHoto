const { Command, EmbedBuilder } = require('../../utils')

module.exports = class EvalCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'eval',
      aliases: ['evaluate', 'e'],
      category: 'dev',
      userPermission: null,
      clientPermission: null,
      onlyDevs: true
    })
  }

  async run(message, args) {
    try {
      let util = require('util');
      let code = args.join(' ');
      let ev = eval(code)
      let str = util.inspect(ev, {
        depth: 1
      })
      str = `${str.replace(new RegExp(`${this.client.token}`, 'g'), 'undefined')}`;
      if (str.length > 1800) {
        str = str.substr(0, 1800)
        str = str + '...'
      }
      message.channel.createMessage(`\`\`\`js\n${str}\`\`\``)

    } catch (err) {
      if (err.stack.length > 1800) {
        err.stack = err.stack.substr(0, 1800)
        err.stack = `${err.stack}...`
      }
      const embed = new EmbedBuilder()
      embed.setColor('ERROR')
      embed.setTitle(`Oh no... An error occurred while doing this action, I'm sorry for what happened. :sob:`)
      embed.setDescription(`\`\`\`${err.stack}\`\`\``)

      message.channel.createMessage(embed.build())
    }
  }
}