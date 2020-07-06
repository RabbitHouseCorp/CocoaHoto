require("./src/ProtoTypes.js").start()

const CocoaClient = require("./src/CocoaClient.js")
const client = new CocoaClient({ fetchAllMembers: true })

client.login()
