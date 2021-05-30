const { config } = require('../utils')
module.exports = {
  label: 'guildMemberUpdate',
  run: (client, guild, member, oldMember) => {
    if (!member.pending) {
      const role = guild.roles.get(config.WELCOME_ROLE_ID)
      member.addRole(role.id)
    }
  }
}