module.exports = {
  label: 'ready',
  run: (client) => {
    console.log('I am now online and working')
    const presence = [
      { name: 'Monitoring Rabbit House Coffee', type: 0 },
      { name: 'Gochuumon wa Usagi Desu K? BLOOM', type: 3 },
      { name: 'Tokimeki Poporon', type: 2 },
      { name: 'Daydream Café', type: 2 }
    ]

    setInterval(() => {
      const status = presence[Math.floor(Math.random() * presence.length)]
      client.editStatus('idle', status)
    }, 15000)
  }
}