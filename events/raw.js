const config = require('../src/config')

module.exports = class RawEvent {
	constructor(client) {
		this.client = client
	}
	
	run(raw) {
    if (raw.t !== "PRESENCE_UPDATE") return 
    if (raw.d.guild_id !== config.GUILD_ID) return
    
    const member = this.client
      .guilds.cache.get(config.GUILD_ID)
      .members.cache.get(raw.d.user.id)

    if (member.user.bot) return

    const hasInvStatus = this.hasInviteStatus(raw.d.activities)
    const hasMuteRole = raw.d.roles.includes(config.MUTE_ROLE_ID)
		if (hasInvStatus && !hasMuteRole) {
			member.roles.add(config.MUTE_ROLE_ID)
		} else if (hasMuteRole && !hasInvStatus) {
			member.roles.remove(config.MUTE_ROLE_ID)
		}
	}

	hasInviteStatus (RawActivities) {
		return RawActivities.some(({ type, state }) => type === 4 && this.isInvite(state))
	}
	
	isInvite (text) {
		return (/((?:discord\.gg|discordapp\.com|www\.|http|invite|discord\.com|discord\.me))/gi).test(text)
	}
}
