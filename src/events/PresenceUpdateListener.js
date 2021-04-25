const { config } = require('../../config')
const { AntiInviteUtils } = require('../utils/')
const antiinvite = new AntiInviteUtils()

module.exports = {
	label: 'presenceUpdate',
	run: async (client, member, oldPresence) => {
		if (member.guild.id !== config.GUILD_ID) return
		if (member.user.bot) return
		const activities = member.activities
		const hasInvStatus = antiinvite.hasInviteStatus(activities)
		const hasMuteRole = member.roles.includes(config.MUTE_ROLE_ID)
		if (hasInvStatus && !hasMuteRole) {
			if (member.roles.includes(config.STAFF_ROLE_ID)) return
			const guildInvite = await client.getGuildInvites(member.guild.id)
			const invite = activities.find(status => status.type === 4).state
				.replace(/(https:\/\/|http:\/\/)/, "")
				.replace(/(discord\.gg|discord\.com\/invite|discordapp\.com\/invite|discord\.me|discord\.io)/, "")
				.replace("/", "")
			if (guildInvite.find(({ code }) => code === invite)) return

			member.addRole(config.MUTE_ROLE_ID)
		} else if (hasMuteRole && !hasInvStatus) {
			member.removeRole(config.MUTE_ROLE_ID)
		}
	}
}
