const config = require('../src/config')

module.exports = class RawEvent {
	constructor(client) {
		this.client = client
	}
	
	run(raw) {
		const rabbitGuild = this.client.guilds.cache.get(config.GUILD_ID)

		if (rabbitGuild && raw.t !== "PRESENCE_UPDATE" && raw.d.guild_id !== rabbitGuild.id) return

		const member = rabbitGuild.members.cache.get(raw.d.user.id)
		const hasInvStatus = this.hasInviteStatus(member)
		const hasMuteRole = member.roles.cache.has(config.MUTE_ROLE_ID)
		if (hasInvStatus && !hasMuteRole) {
			member.roles.add(config.MUTE_ROLE_ID)
		} else if (hasMuteRole && !hasInvStatus) {
			member.roles.remove(config.MUTE_ROLE_ID)
		}
	}

	hasInviteStatus (member) {
		return member.presence.activities.some(({ type, state }) => type === "CUSTOM_STATUS" && this.isInvite(state.toLowerCase()))
	}
	
	isInvite (text) {
		return (/((?:discord\.gg|discordapp\.com|www\.|http|invite|discord\.com|discord\.me))/g).test(text)
	}
}
