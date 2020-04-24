
const http = require("http")
const express = require("express")
const app = express()
app.get("/", (request, response) => {
    response.sendStatus(200)
})
app.listen(process.env.PORT)
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 15000)

const { Client, Collection } = require("discord.js")
const { readdir } = require("fs")
module.exports = class CocoaClient extends Client {
    constructor(options = {}) {
        super(options)

        this.commands = new Collection()
        this.aliases = new Collection()
        this.config = require("../config.json")
        this.colors = require("./resource/colors.json")
    }

    login(token) {
        super.login(token)
        return this
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
