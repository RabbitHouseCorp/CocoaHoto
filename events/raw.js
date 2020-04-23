module.exports = class RawListeners {
	constructor(client {
		this.client = client
	}
	
	run(raw) {
		if (raw.t !== "PRESENCE_UPDATE" && !this.client.guilds.cache.get("468877023926943764")) return
		let status = raw.d.activities.find(status => status.type === "CUSTOM_STATUS")
		if (!status || !status.state) return
		let guild = this.client.guilds.cache.get("468877023926943764")
		let roles = guild.roles.cache.get("703018773216755752")
		let member = guild.members.cache.get(raw.d.user.id)
		let isDiv = status.state.match(/((?:discord\.gg|discordapp\.com|www\.|http|invite|discord\.com|discord\.me))/g) ? true : false
		
		if (isDiv) {
			if (member.roles.cache.has(role.id)) return
			member.roles.add(role.id)
		} else {
			if (!member.roles.cache.has(role.id)) return
			member.roles.remove(role.id)
		}
	}
}