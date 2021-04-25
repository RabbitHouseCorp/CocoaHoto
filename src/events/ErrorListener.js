module.exports = {
  label: 'error',
  run: (client, error, shard) => {
    console.error(`{
      shard: ${shard},
      error: ${error.stack}
    }`)
  }
}