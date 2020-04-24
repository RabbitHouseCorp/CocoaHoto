const config = require('./config.json')

const Client = require("./src/CocoaClient.js")
const client = new Client({fetchAllMembers: true})
require("./src/ProtoTypes.js").start()
client.loadCommands("./commands")
client.loadEvents("./events")
client.login(config.bot_token)
console.log("Starting...")