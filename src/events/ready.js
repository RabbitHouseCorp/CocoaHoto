module.exports = class ReadyEvent {
  constructor(client) {
    this.client = client
  }

  async run() {
    console.log("Started")
    let stats = [
      { name: "Monitoring Rabbit House Coffee", type: "PLAYING" },
      { name: "with Chino", type: "WATCHING" },
      { name: "Tokimeki Poporon", type: "LISTENING" },
      { name: "Daydream Café", type: "LISTENING" },
      { name: "with Tippy", type: "PLAYING" }
    ]

    setInterval(() => this.Status(stats), 15000)
  }

  Status(stats) {
    let status = stats[Math.floor(Math.random() * stats.length)]
    this.client.user.setPresence({ activity: status })
  }
}
