const { EmbedBuilder, config } = require('../utils')

module.exports = {
  label: 'guildMemberRemove',
  run: (client, guild, member) => {
    const channel = guild.channels.get(config.LEAVE_CHANNEL_ID)

    const embed = new EmbedBuilder()
    embed.setColor('LEAVE')
    embed.setThumbnail(member.user.avatarURL)
    embed.setAuthor(`${member.user.username}#${member.user.discriminator}`, member.user.avatarURL)
    embed.setFooter(`Now we have ${guild.memberCount} members`, guild.iconURL)
    embed.addField(`${member.user.username}#${member.user.discriminator} left from the guild`, `See you later **${member.user.username}#${member.user.discriminator}**, we will be waiting for you here in **${guild.name}**, I hope you come back!\n\nWith ${member.user.username} leaving, we now have ${guild.memberCount} people in ${guild.name}.`)

    channel.edit({
      topic: `[Click to expand] ${member.guild.memberCount} members | Read the <#${config.INFO_CHANNEL_ID}> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: https://discord.gg/CAm9cSU\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discordapp.com/oauth2/authorize?client_id=${config.MAIN_BOT_ID}&scope=bot&permissions=2117578239`
    })
    member.addRole(role.id)
    channel.createMessage(embed.build())
  }
}