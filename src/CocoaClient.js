
const { readdir } = require("fs")
const { Client, Collection } = require("discord.js")

module.exports = class CocoaClient extends Client {
    constructor(options = {}) {
        super({ ...options, fetchAllMembers: true })

        this.commands = new Collection()
        this.aliases = new Collection()
        this.config = require('./config')
        this.colors = require("./resource/colors.json")
    }

    login() {
        console.log("Starting...")
        this.loadCommands("./commands")
        this.loadEvents("./events")
        return super.login(this.config.BOT_TOKEN)
    }

    loadCommands(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(category => {
                readdir(`./${path}/${category}`, (err, cmd) => {
                    cmd.forEach(cmd => {
                        const command = new(require(`.${path}/${category}/${cmd}`))(this)
                        this.commands.set(command.config.name, command)
                        command.config.aliases.forEach(alias => this.aliases.set(alias, command.config.name))
                    })
                })
            })
        })
    }

    loadEvents(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(events => {
                const event = new(require(`../${path}/${events}`))(this)
                super.on(events.split(".")[0], (...args) => event.run(...args))
            })
        })

        return this
    }
}
