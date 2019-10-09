const { MessageEmbed } = require("discord.js")
module.exports = class GuildMemberAddEvent {
    constructor (client) {
        this.client = client
    }

    run(member) {
        let role = member.guild.roles.get('468884032399081473')
        let channel = member.guild.channels.get('468878407711719435')
        
        let embed = new MessageEmbed()
        .setColor(this.client.colors.default)
        .setThumbnail(member.user.displayAvatarURL())
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setFooter(`Now we have ${member.guild.memberCount} members`, member.guild.iconURL())
        .addField(`Welcome ${member.user.tag}`, `${member} joined my server, welcome and thanks for join!\n\nIs important that you read the <#483056680980971531> to know everything and avoid being punished!`)
        
        channel.setTopic(`[Click for expand] ${member.guild.memberCount} members | Read the <#483056680980971531> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: https://discord.gg/CAm9cSU\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discordapp.com/oauth2/authorize?client_id=481282441294905344&scope=bot&permissions=2117578239`)
        member.roles.add(role).then(() => {
            channel.send(member, embed)
        })
    }
}