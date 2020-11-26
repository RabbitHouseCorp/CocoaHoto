const config = require('../config')
const { MessageEmbed } = require("discord.js")

module.exports = class MessageEvent {
  constructor(client) {
    this.client = client
  }

  async run(message) {
    if (message.channel.type === "dm") return
    if (message.author.bot) return
    let IsInviteOfServer;
  
  
    let url = (/(nakedphotos\.club|viewc\.site|privatepage\.vip)/g).test(message.content)
    let DiscordInvite = (/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me)/g).test(message.content)
    if (url) {
        await message.guild.fetchInvites().then(async (invite) => {
          const messageRaioX = message.content
                                  .replace(/(https:\/\/|http:\/\/)/, "")
                                  .replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me)/, "")
                                  .replace("/", "").split(" ")
          if(invite.find(e => e.code == messageRaioX) == null ? false : true) {
          IsInviteOfServer = true
          } else {
            IsInviteOfServer = false
          }
      
      })
      if (!IsInviteOfServer == false) return
      if (message.member.roles.cache.has(config.STAFF_ROLE_ID)) return
      // Filtro de invite
     
    
   
      message.member.ban({ days: 7, reason: "[AUTO BAN] - SPAM BOT: Send inappropriate links on servers." }).then(user => {
        let embed = new MessageEmbed()
          .setColor(this.client.colors.punishment)
          .setAuthor(`${user.user.tag} | Banned`, user.user.displayAvatarURL())
          .addField("User banned", user.user.tag, true)
          .addField("Who banned", this.client.user.tag, true)
          .addField("Reason", "```fix\n[AUTO BAN] - SPAM BOT: Send inappropriate links on servers.```")

        message.guild.channels.cache.get(config.LOG_PUBLIC_CHANNEL_ID).send(embed)
      })
    }

    if (this.isInvite(message.content) == true) {
      await message.guild.fetchInvites().then(async (invite) => {
        const messageRaioX = message.content
                                .replace(/(https:\/\/|http:\/\/)/, "")
                                .replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me)/, "")
                                .replace("/", "").split(" ")
        if(invite.find(e => e.code == messageRaioX) == null ? false : true) {
         IsInviteOfServer = true
        } else {
          IsInviteOfServer = false
        }
     
    })
      if (!IsInviteOfServer == false) return
      if (message.member.roles.cache.has(config.STAFF_ROLE_ID)) return
      message.member.ban({ days: 7, reason: "[AUTO BAN] - ADVERSTING: Adversiting other servers in public chat generates automatic ban." }).then(user => {
        let embed = new MessageEmbed()
          .setColor(this.client.colors.punishment)
          .setAuthor(`${user.user.tag} | Banned`, user.user.displayAvatarURL())
          .addField("User banned", user.user.tag, true)
          .addField("Who banned", this.client.user.tag, true)
          .addField("Reason", "```fix\n[AUTO BAN] - ADVERSTING: Adversiting other servers in public chat generates automatic ban.```")

        message.guild.channels.cache.get(config.LOG_PUBLIC_CHANNEL_ID).send(embed)
      })
    }

    if (message.content === message.guild.me.toString()) {
      message.cocoaReply(`my prefix is \`${process.env.PREFIX}\`, for now, I don't have a help command.`)
    }
    if (!message.content.startsWith(process.env.PREFIX)) return
    const args = message.content.slice(process.env.PREFIX.length).trim().split(" ")
    const command = args.shift().toLowerCase()
    const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
    if (!cmd) return
    if (cmd.config.onlyDevs) {
      if (!config.OWNER_IDS.includes(message.author.id)) return message.cocoaReply("only developers has access from this command")
    }
    let userPerms = cmd.config.userPermission
    let clientPerms = cmd.config.clientPermission
    if (userPerms !== []) {
      if (!message.member.hasPermission(userPerms)) return message.cocoaReply(`you don't have permission for \`${userPerms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\``)
    }
    if (clientPerms !== []) {
      if (!message.guild.me.hasPermission(clientPerms)) return message.cocoaReply(`I don't have permision for \`${clientPerms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\`, poderia pedir para alguém da administração me dar esta permissão? Obrigada!`).catch(() => message.author.send(`Eu não as seguintes permissões \`${clientPerms.map(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, " ")).join(", ")}\` no servidor \`${message.guild.name}\`, poderia pedir para me darem esta permissão? Obrigada!`).catch(() => { }))
    }

    try {
      new Promise((res, rej) => {
        res(cmd.run(message, args))
      }).catch(err => {
        message.cocoaReply("Oh no... An error occurred while doing this action, I'm sorry for what happened. :sob:")
        console.error(err.stack)
      })
    } catch (err) {
      console.error(err.stack)
    }
  }

  isInvite(text) {
    text = `${text}`.replace(/(https:\/\/|http:\/\/)/g, "")
		if((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me))/g).test(text)) {
			const textReplace_1 = text
									.replace(/(https:\/\/)?(http:\/\/)/g, "")
									.replace(/(?:discord\.gg|discordapp\.com\/invite|discord.com\/invite|discord\.com\/invite|discord\.me)/g, "")
									.replace(/(\/)/g, "")
			const textReplace_2 = text
									.replace(/(https:\/\/)?(http:\/\/)/g, "")
									.replace(/(?:discord\.gg|discordapp\.com\/invite|discord.com\/invite|discord\.com\/invite|discord\.me)/g, "")
			if (!textReplace_1.length > 1) return false // Para verificar se é um codigo inválido ou seja .. se estiver "discord.gg/" ou apenas "discord.gg"
			
			
			if ((/(\/+(\b\s+[a-z0-9-.]+)?.+)/g).test(text) == true) {
				// Confirmação do invite!
				return true
			} else { 
				return false
			}
			// :^) Caso se nenhum desses codigo aqui encima ^, acaba não retornando em nada.. 
			return false
		}
		return (/((?:discord\.gg|discordapp\.com\/invite|discord.com\/invite|discord\.com\/invite|discord\.me))/g).test(text)
	}
}
