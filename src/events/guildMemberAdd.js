const config = require('../config')
const { MessageEmbed } = require("discord.js")

module.exports = class GuildMemberAddEvent {
    constructor(client) {
        this.client = client
    }

    run(member) {
        let role = member.guild.roles.cache.get(config.WELCOME_ROLE_ID)
        let channel = member.guild.channels.cache.get(config.WELCOME_CHANNEL_ID)

        let embed = new MessageEmbed()
            .setColor(this.client.colors.default)
            .setThumbnail(member.user.displayAvatarURL())
            .setAuthor(member.user.tag, member.user.displayAvatarURL())
            .setFooter(`Now we have ${member.guild.memberCount} members`, member.guild.iconURL())
            .addField(`Welcome ${member.user.tag}`, `${member} joined my server, welcome and thanks for join!\n\nIs important that you read the <#${config.INFO_CHANNEL_ID}> to know everything and avoid being punished!`)

        channel.setTopic(`[Click to expand] ${member.guild.memberCount} members | Read the <#${config.INFO_CHANNEL_ID}> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: https://discord.gg/CAm9cSU\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discordapp.com/oauth2/authorize?client_id=${config.MAIN_BOT_ID}&scope=bot&permissions=2117578239`)
        member.roles.add(role).then(() => {
            channel.send(member, embed)
        })
    }
}
