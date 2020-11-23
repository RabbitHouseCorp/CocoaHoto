
const { readdir } = require("fs")
const { Client, Collection } = require("discord.js")
const config = require('./config')
const { join } = require('path')

module.exports = class CocoaClient extends Client {
    constructor(options = {}) {
        super({ ...options, fetchAllMembers: true })

        this.commands = new Collection()
        this.aliases = new Collection()
        this.colors = require("./resource/colors.json")
    }

    login() {
        console.log("Starting...")
     
        this.loadCommands(join(__dirname, "commands"))
        this.loadEvents(join(__dirname, "events"))
        return super.login(config.BOT_TOKEN)
    }

    loadCommands(path) {
        readdir(path, (err, f) => {
            if (err) return console.error(err.stack)
            f.forEach(category => {
                readdir(join(path, category), (err, cmd) => {
                    cmd.forEach(cmd => {
                      const command = new(require(join(path, category, cmd)))(this)
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
                const event = new(require(join(path, events)))(this)
                const eventName = events.split(".")[0]
                super.on(eventName, (...args) => {
                  try {
                    event.run(...args)
                  } catch (err) {
                    console.log('EVENT_ERROR:', eventName, err)
                  }
                })
            })
        })

        return this
    }
}
