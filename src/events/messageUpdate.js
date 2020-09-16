const config = require('../config')
const { MessageEmbed } = require("discord.js")
module.exports = class MessageUpdateEvent {
	constructor(client) {
		this.client = client
	}

	async run(oldMessage, newMessage) {

		if (oldMessage.author.bot) return

		const embed = new MessageEmbed()
		embed.setColor(this.client.colors.default)
		embed.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
		embed.setFooter(`User ID: ${oldMessage.author.id}`)
		embed.setTimestamp(new Date())
		embed.setDescription(`${oldMessage.author} **edited a message**\n\n**Text channel:** ${oldMessage.channel}`)
		embed.addField("Old message", `\`\`\`${oldMessage.content}\`\`\``)
		embed.addField("New message", `\`\`\`${newMessage.content}\`\`\``)

		oldMessage.guild.channels.cache.get(config.LOG_PRIVATE_CHANNEL_ID).send(embed)

		if (oldMessage.content === newMessage.content) return
		this.client.emit("message", newMessage)
	}
}