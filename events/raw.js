module.exports = class RawEvent {
	constructor(client) {
		this.client = client
	}
	
	run(raw) {
		const rabbitGuild = this.client.guilds.cache.get("468877023926943764")

		if (rabbitGuild && raw.t !== "PRESENCE_UPDATE" && raw.d.guild_id !== rabbitGuild.id) return

		const muteRoleId = "703018773216755752"
		const member = rabbitGuild.members.cache.get(raw.d.user.id)
		const hasInvStatus = this.hasInviteStatus(member)
		const hasMuteRole = member.roles.cache.has(muteRoleId)
		if (hasInvStatus && !hasMuteRole) {
			member.roles.add(muteRoleId)
		} else if (hasMuteRole && !hasInvStatus) {
			member.roles.remove(muteRoleId)
		}
	}

	hasInviteStatus (member) {
		return member.presence.activities.some(({ type, state }) => type === "CUSTOM_STATUS" && this.isInvite(state.toLowerCase()))
	}
	
	isInvite (text) {
		return (/((?:discord\.gg|discordapp\.com|www\.|http|invite|discord\.com|discord\.me))/g).test(text)
	}
}
