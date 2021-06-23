const { AntiInviteUtils, EmbedBuilder, config } = require('../utils/')
const invite = new AntiInviteUtils()

module.exports = {
  label: 'messageCreate',
  run: async (client, message) => {
    if (message.author.bot) return
    if (message.channel.type !== 0) return
    const guild = client.guilds.get(config.GUILD_ID)
    if (message.content.toLowerCase().includes('coco arroto')) {
      return message.channel.createMessage(`Hey ${message.author.mention}! O que eu fiz pra você me chamar assim? Isso é bullying, sabia? Recomendo parar de me chamar assim, eu não sou nenhuma palhaça para ser apelidada dessa forma. Hmpf! <:cocoa_shok:653653495412424705>`)
    }
    if ((/(?:stmeacomunnitty\.ru)/g).test(message.content.toLowerCase())) {
      const embed = new EmbedBuilder()
      embed.setColor('PUNISHMENT')
      embed.setAuthor(`${message.author.username}#${message.author.discriminator} | Banned`, message.author.avatarURL)
      embed.setThumbnail(client.user.avatarURL)
      embed.addField('Username', `${message.author.username}#${message.author.discriminator} (\`${message.author.id}\`)`)
      embed.addField('Who punished', `${client.user.username}#${client.user.discriminator} (\`${client.user.id}\`)`)
      embed.addField('Reason', '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')
      
      message.delete()
      message.channel.guild.banMember(message.author.id, 7, '[AUTO MOD] SPAMBOT - Sending a malicious or NSFW URL is not allowed in our guild. Get away from here!')
      return guild.channels.get(config.LOG_PUBLIC_CHANNEL_ID).createMessage(embed.build())
    }
    if (invite.isInvite(message.content.toLowerCase())) {
      if (message.member.roles.includes(config.STAFF_ROLE_ID)) return
      const guildInvite = await client.getGuildInvites(message.guildID)
      const messageInvite = message.content
        .replace(/(https:\/\/|http:\/\/)/, "")
        .replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me|discord\.io)/, "")
        .replace("/", "")
      if (guildInvite.find(({ code }) => code === messageInvite)) return
      const embed = new EmbedBuilder()
      embed.setColor('PUNISHMENT')
      embed.setAuthor(`${message.author.username}#${message.author.discriminator} | Warned`, message.author.avatarURL)
      embed.setThumbnail(client.user.avatarURL)
      embed.addField('Username', `${message.author.username}#${message.author.discriminator} (\`${message.author.id}\`)`)
      embed.addField('Who punished', `${client.user.username}#${client.user.discriminator} (\`${client.user.id}\`)`)
      embed.addField('Reason', '[AUTO MOD] ADVERSITING - Adversiting others Discord server in public chat.')
      message.delete()
      message.channel.createMessage(`Hey ${message.author.mention}! Stop right there. You can't adversiting others Discord guild here.`)
      return guild.channels.get(config.LOG_PUBLIC_CHANNEL_ID).createMessage(embed.build())
    }

    if (!message.content.startsWith(config.PREFIX)) return
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    const command = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName))
    if (!command) return
    if (command.config.onlyDevs && !config.OWNER_IDS.includes(message.author.id)) return message.channel.createMessage(`${message.author.mention}, only developers has access from this command.`)

    command.run(message, args)
  }
}
