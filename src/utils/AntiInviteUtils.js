module.exports = class AntiInviteUtils {
  constructor() {
    this
  }

  hasInviteStatus(activities) {
    return activities.some(({ type, state }) => type === 4 && this.isInvite(state))
  }

  isInvite(text) {
    if ((/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)) {
      const textReplace_1 = text
        .replace(/(https:\/\/)?(http:\/\/)/g, '')
        .replace(/(discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io)/g, '')
        .replace(/(\/)/g, '')

      if (!textReplace_1.length > 1) return false // Para verificar se é um codigo inválido ou seja .. se estiver 'discord.gg/' ou apenas 'discord.gg'
      if ((/(\/+(\s+[a-z0-9-.]+)?.+)/g).test(text) == true) {
        // Confirmação do invite!
        return true
      } else {
        return false
      }
      // :^) Caso se nenhum desses codigo aqui encima ^, acaba não retornando em nada.. 
      return false
    }
    return (/((?:discord\.gg|discordapp\.com\/invite|discord\.com\/invite|discord\.me|discord\.io))/g).test(text)
  }

}