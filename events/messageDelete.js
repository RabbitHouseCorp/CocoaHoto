const { MessageEmbed } = require("discord.js")
module.exports = class MessageDeleteReceive {
    constructor(client) {
        this.client = client
    }

    run(message) {

        let embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setDescription("**Deleted text message**")
            .addBlankField(true)
            .addField("Message", `\`\`\`fix\n${message.content}\`\`\``)

        message.guild.channels.cache.get("468880753195745291").send(embed)
    }
}