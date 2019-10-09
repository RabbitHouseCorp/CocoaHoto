const { MessageEmbed } = require("discord.js")
module.exports = class MessageUpdateEvent {
	constructor (client) {
		this.client = client
	}
	
	async run(oldMessage, newMessage) {
		const embed = new MessageEmbed()
		.setColor(this.client.colors.default)
		.setTitle("Message edited")
		.addField("Old message", `\`\`\`${oldMessage.content}\`\`\``)
		.addField("New message", `\`\`\`${newMessage.content}\`\`\``)
		
		message.guild.channels.get("468880753195745291").send(embed)
	}
}