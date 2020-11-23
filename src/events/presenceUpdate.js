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
		if((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me))/g).test(text)) {
			const textReplace_1 = text
									.replace(/(https:\/\/)?(http:\/\/)/g, "")
									.replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me)/g, "")
									.replace(/(\/)/g, "")
			const textReplace_2 = text
									.replace(/(https:\/\/)?(http:\/\/)/g, "")
									.replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me)/g, "")
			if (!textReplace_1.length > 1) return false // Para verificar se é um codigo inválido ou seja .. se estiver "discord.gg/" ou apenas "discord.gg"
			
			
			if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(text) == true) {
				// Confirmação do invite!
				return true
			} else { 
				return false
			}
			// :^) Caso se nenhum desses codigo aqui encima ^, acaba não retornando em nada.. 
			return false
		}
		return (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me))/g).test(text)
	}
}
