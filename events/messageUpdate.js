const { MessageEmbed } = require("discord.js")
module.exports = class MessageUpdateEvent {
	constructor (client) {
		this.client = client
	}
	
	async run(oldMessage, newMessage) {

		if (oldMessage.author.bot) return

		const embed = new MessageEmbed()
		.setColor(this.client.colors.default)
		.setAuthor(oldMessage.author.tag, oldMessage.author.displayAvatarURL())
		.setFooter(`User ID: ${oldMessage.author.id}`)
		.setTimestamp(new Date())
		.setDescription(`${oldMessage.author} **edited a message**\n\n**Text channel:** ${oldMessage.channel}`)
		.addBlankField(true)
		.addField("Old message", `\`\`\`${oldMessage.content}\`\`\``)
		.addField("New message", `\`\`\`${newMessage.content}\`\`\``)
		
		oldMessage.guild.channels.get("468880753195745291").send(embed)
		
		if (oldMessage.content === newMessage.content) return
		this.client.emit("message", newMessage)
	}
}