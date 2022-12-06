require('dotenv').config()

import { ApolloServer } from 'apollo-server-express'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import { createServer } from 'http'
import { schema } from './schema'
import express from 'express'
import cors from 'cors'

const PORT: number | string = process.env.GRAPHQL_PORT || 4004

const app = express()
const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: ({ req }) => {
    return {
      headers: req
    }
  }
})
app.use('*', cors())
app.use(compression())
server.applyMiddleware({ app, path: '/graphql' })
const httpServer = createServer(app)
httpServer.listen({ port: PORT }, (): void =>
  console.log(`🚀\nGraphQL is now running on http://localhost:${PORT}/graphql`)
)
