const { readdir } = require('fs')
const { Client, Collection } = require('eris')
const { join } = require('path')

module.exports = class CocoaClient extends Client {
  constructor(token, options = {}) {
    super(token, options)

    this.commands = new Collection()
    this.aliases = new Collection()
  }

  connect() {
    console.log('Starting...')

    this.loadCommands(join(__dirname, 'commands'))
    this.loadEvents(join(__dirname, 'events'))
    return super.connect()
  }

  loadCommands(path) {
    readdir(path, (err, f) => {
      if (err) return console.error(err.stack)
      f.forEach(category => {
        readdir(join(path, category), (err, cmd) => {
          cmd.forEach(cmd => {
            const Command = require(join(path, category, cmd))
            const command = new Command(this)
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
        const event = require(join(path, events))
        const eventName = event.label
        super.on(eventName, (...args) => event.run(this, ...args))
      })
    })
  }
}
