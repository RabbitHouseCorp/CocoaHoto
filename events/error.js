module.exports = class ErrorEvent {
    constructor (client) {
        this.client = client
    }

    run(err) {
        console.error(err)
    }
}