const Command = require("../../src/structures/Command")
module.exports = class NotifyCommand extends Command {
    constructor(client) {
        super(client, {
            name: "notify",
            aliases: ["notificar"]
        })
    }

    run(message, args) {

        if (message.member.roles.cache.has(this.client.config.NOTIFY_ROLE_ID)) {
            message.member.roles.remove(this.client.config.NOTIFY_ROLE_ID).then(() => {
                message.reply("you will no longer receive Chino news")
            })
        } else {
            message.member.roles.add(this.client.config.NOTIFY_ROLE_ID).then(() => {
                message.reply("now you will receive more news from Chino")
            })
        }
    }
}