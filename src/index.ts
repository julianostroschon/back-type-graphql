import mercurius from 'mercurius'
import Fastify from 'fastify'

import buildServer from './server/index'

const app = Fastify({
  requestIdLogLabel: 'traceID',
  disableRequestLogging: true,
  logger: {
    name: 'parti-notes-back',
    level: 'info'
  }
})

async function run() {
  buildServer(app, mercurius)
    .then((server) => {
      const port = '4001'
      return server.listen(port)
    })
    .then(({ url }) => {
      app.log.info(`🚀 Server ready at ${url}`)
      return
    })
    .catch((err) => {
      app.log.error(err.message)
    })
}

run()
