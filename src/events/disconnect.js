module.exports = class DisconnectEvent {
    constructor (client) {
        this.client = client
    }

    run() {
        console.log("WebSocket desconnected from Discord")
    }
}