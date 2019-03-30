'use strict'

global = require('./global') // eslint-disable-line no-global-assign

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

router.forEach((route) => { server.route(route) })

const init = async () => {
  await server.start()
  Log.success(`Server running at: ${server.info.uri}`)
  Log.info(config.userid)
}

process.on('unhandledRejection', (err) => {
  Log.error(err)
})

/* eslint-disable no-global-assign */
client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
/* eslint-enable no-global-assign */

client.ping()
  .then((res) => {
    Log.success('Connected to Elasticsearch.')
    init()
  })
  .catch(err => Log.error(err))
