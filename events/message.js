const { MessageEmbed } = require("discord.js")
module.exports = class MessageEvent {
  constructor(client) {
    this.client = client
  }

  async run(message) {
    if (message.channel.type === "dm") return
    if (message.author.bot) return

    let url = ["https://nakedphotos.club/", "https://viewc.site/", "https://privatepage.vip/"]
    let DiscordInvite = ["discordapp.com/invite", "discord.gg", "discord.me"]
    if (url.some(url => message.content.includes(url))) {
    	if (message.member.roles.has("554039524309860362")) return
      message.member.ban({days: 7, reason: "[AUTO BAN] - SPAM BOT: Send inappropriate links on servers."}).then(user => {
        let embed = new MessageEmbed()
        .setColor(this.client.colors.punishment)
        .setAuthor(`${user.user.tag} | Banned`, user.user.displayAvatarURL())
        .addField("User banned", user.user.tag, true)
        .addField("Who banned", this.client.user.tag, true)
        .addField("Reason", "```fix\n[AUTO BAN] - SPAM BOT: Send inappropriate links on servers.```")

        message.guild.channels.get("468881393787863052").send(embed)
      })
    }

    if (DiscordInvite.some(url => message.content.includes(url))) {
    	if (message.member.roles.has("554039524309860362")) return
      message.member.ban({days: 7, reason: "[AUTO BAN] - DISCLOSURE: Disclosing other servers in public chat generates automatic ban."}).then(user => {
        let embed = new MessageEmbed()
        .setColor(this.client.colors.punishment)
        .setAuthor(`${user.user.tag} | Banned`, user.user.displayAvatarURL())
        .addField("User banned", user.user.tag, true)
        .addField("Who banned", this.client.user.tag, true)
        .addField("Reason", "```fix\n[AUTO BAN] - DISCLOSURE: Disclosing other servers in public chat generates automatic ban.```")

        message.guild.channels.get("468881393787863052").send(embed)
      })
    }

    if (message.content === message.guild.me.toString()) {
      message.cocoaReply(`my prefix is \`${process.env.PREFIX}\`, use \`${process.env.PREFIX}ajuda\``)
    }
    if (!message.content.startsWith(process.env.PREFIX)) return
    const args = message.content.slice(process.env.PREFIX.length).trim().split(" ")
    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return
    if (cmd.config.onlyDevs) {
      if (!this.client.config.owner.some(owner => message.author.id === owner)) return message.cocoaReply("only developers has access from this command")
    }
    let userPerms = cmd.config.userPermission
    let clientPerms = cmd.config.clientPermission
    if (userPerms !== []) {
      if (!message.member.hasPermission(userPerms)) return message.cocoaReply(`you don't have permission for \`${userPerms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\``)
    }
    if (clientPerms !== []) {
      if (!message.guild.me.hasPermission(clientPerms)) return message.cocoaReply(`I don't have permision for \`${clientPerms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\`, poderia pedir para alguém da administração me dar esta permissão? Obrigada!`).catch(() =>message.author.send(`Eu não as seguintes permissões \`${clientPerms.map(value => value.charAt(0).toUpperCase() +  value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\` no servidor \`${message.guild.name}\`, poderia pedir para me darem esta permissão? Obrigada!`).catch(() => {}))
    }

    try {
      new Promise((res, rej) => {
        res(cmd.run(message, args))
      }).catch(err => {
        message.cocoaReply("Oh no... An error occurred while doing this action, I'm sorry for what happened. :sob:")
        console.error(err.stack)
      })
    } catch(err) {
      console.error(err.stack)
    }
  }
}
