const { EmbedBuilder, config } = require('../utils')
module.exports = {
  label: 'guildMemberAdd',
  run: (client, guild, member) => {
    const role = guild.roles.get(config.WELCOME_ROLE_ID)
    const channel = guild.channels.get(config.WELCOME_CHANNEL_ID)

    const embed = new EmbedBuilder()
    embed.setColor('WELCOME')
    embed.setThumbnail(member.user.avatarURL)
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`Now we have ${guild.memberCount} members`, guild.iconURL)
    embed.addField(
      `Welcome ${member.user.username}#${member.user.discriminator}`,
      `${member.user.username}#${member.user.discriminator} joined on my guild, welcome and thanks for join!\nIs important that you read the <#${config.INFO_CHANNEL_ID}> to know everything and avoid being punished. You need support? Then you can go into any channel of the support category.`
    )
    
    channel.edit({
      topic: `[Click to expand] ${member.guild.memberCount} members | Read the <#${config.INFO_CHANNEL_ID}> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: https://discord.gg/CAm9cSU\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discordapp.com/oauth2/authorize?client_id=${config.MAIN_BOT_ID}&scope=bot&permissions=2117578239`
    })
    member.addRole(role.id)
    channel.createMessage(embed.build())
  }
}