const config = require('../config')
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
            .addField("Message", `\`\`\`fix\n${message.content}\`\`\``)

        message.guild.channels.cache.get(config.LOG_PRIVATE_CHANNEL_ID).send(embed)
    }
}
