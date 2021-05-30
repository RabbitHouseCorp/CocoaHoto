const { config } = require('../utils')
module.exports = {
  label: 'guildMemberUpdate',
  run: (client, guild, member, oldMember) => {
    if (member.user.bot) {
      const role = guild.roles.get(config.BOT_ROLE_ID)
      if (member.roles.includes(role.id)) return
      member.addRole(role.id)
      return
    }

    if (!member.pending) {
      const role = guild.roles.get(config.WELCOME_ROLE_ID)
      member.addRole(role.id)
    }
  }
}