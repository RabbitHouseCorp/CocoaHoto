const { options } = require('./config')
const CocoaClient = require('./src/CocoaClient.js')
const client = new CocoaClient(process.env.TOKEN, options)
client.connect()