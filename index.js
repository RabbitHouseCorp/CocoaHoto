require("./src/ProtoTypes.js").start()

const CocoaClient = require("./src/CocoaClient.js")
const client = new CocoaClient({ fetchAllMembers: true })

client.login()

// Glitch
const http = require("http")
const express = require("express")
const app = express()

app.get("/", (_, res) => {
    res.sendStatus(200)
})

app.listen(process.env.PORT)

setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`)
}, 15000)
