module.exports = class ReconnectingEvent {
    constructor (client) {
        this.client = client
    }

    run() {
        console.log("Reconnecting to Discord...")
    }
}