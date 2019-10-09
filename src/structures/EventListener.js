module.exports = class EventListener {
  constructor(eventName) {
    this.eventName = eventName
  }

  run(...args) {}

  register(client {
    this.client = client
    this.client.on(this.eventName, (...args) => this.run(...args))
  })
}
