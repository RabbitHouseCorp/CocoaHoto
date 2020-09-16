const config = require('../config')

module.exports = class presenceUpdateEvent {
	constructor(client) {
		this.client = client
	}

	run(oldPresence, newPresence) {
		if (newPresence.guild.id !== config.GUILD_ID) return

		if (newPresence.member.user.bot) return

		const hasInvStatus = this.hasInviteStatus(newPresence.activities)
		const hasMuteRole = newPresence.member.roles.cache.has(config.MUTE_ROLE_ID)
		if (hasInvStatus && !hasMuteRole) {
			newPresence.member.roles.add(config.MUTE_ROLE_ID)
		} else if (hasMuteRole && !hasInvStatus) {
			newPresence.member.roles.remove(config.MUTE_ROLE_ID)
		}
	}

	hasInviteStatus(activities) {
		return activities.some(({ type, state }) => type === 'CUSTOM_STATUS' && this.isInvite(state))
	}

	isInvite(text) {
		return (/((?:discord\.gg|discordapp\.com|www\.|invite|discord\.com|discord\.me))/gi).test(text)
	}
}
