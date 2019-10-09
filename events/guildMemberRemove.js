const { MessageEmbed } = require("discord.js")
module.exports = class GuildMemberRemoveEvent {
    constructor (client) {
        this.client = client
    }

    run(member) {
        let channel = member.guild.channels.get('468878407711719435')
	
        let embed = new MessageEmbed()
        .setColor(this.client.colors.leave)
        .setThumbnail(member.user.displayAvatarURL())
        .setAuthor(member.user.tag, member.user.displayAvatarURL())
        .setFooter(`Now we have ${member.guild.memberCount} members`, member.guild.iconURL())
        .addField(`Bye ${member.user.tag}`, `See you later ${member}, I'll be waiting for you here in **${member.guild.name}**, I hope you come back!\n\nWith ${member.user.username} leaving, we now have ${member.guild.memberCount} people in ${member.guild.name}.`)
        
        channel.setTopic(`[Click for expand] ${member.guild.memberCount} members | Read the <#483056680980971531> to know what is allowed or not. \n\n**INVITE TO SERVER:** If you want to know about the server invite, here it is: https://discord.gg/CAm9cSU\n\n**CHINO'S INVITE:** If you want to add it to your server, here is my invite: https://discordapp.com/oauth2/authorize?client_id=481282441294905344&scope=bot&permissions=2117578239`)
        channel.send(embed)
    }
}