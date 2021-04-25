const { config } = require('../../config')
const { AntiInviteUtils } = require('../utils/')
const antiinvite = new AntiInviteUtils()

module.exports = {
	label: 'presenceUpdate',
	run: (client, member, oldPresence) => {
		if (member.guild.id !== config.GUILD_ID) return
		if (member.user.bot) return
		const hasInvStatus = antiinvite.hasInviteStatus(member.activities)
		const hasMuteRole = member.roles.includes(config.MUTE_ROLE_ID)
		if (hasInvStatus && !hasMuteRole) {
			member.addRole(config.MUTE_ROLE_ID)
		} else if (hasMuteRole && !hasInvStatus) {
			member.removeRole(config.MUTE_ROLE_ID)
		}
	}
}
