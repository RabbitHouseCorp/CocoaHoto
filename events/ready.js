const { Client } = require("discord.js")
let client = new Client()
module.exports = class ReadyEvent {
  constructor(client) {
    this.client = client
  }

  async run() {
    console.log("Started")
    client = this.client
    let stats = [
      {name: "Monitoring Rabbit House Coffee", type: "PLAYING"},
      {name: "with Chino", type: "WATCHING"},
      {name: "Tokimeki Poporon", type: "LISTENING"},
      {name: "Daydream Café", type: "LISTENING"},
      {name: "with Tippy", type: "PLAYING"}
    ]
    function Status() {
      let status = stats[Math.floor(Math.random() * stats.length)]
      client.user.setPresence({activity: status})
    }

    Status()
    setInterval(() => Status(), 15000)
    //this.client.user.setPresence({activity: {name: `${process.env.PREFIX}ajuda | ${this.client.users.size} usuários`, type: "STREAMING", url: "https://twitch.tv/danielagc"}})
  }
}
