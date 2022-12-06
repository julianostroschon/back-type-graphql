import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { getPort, getHost, getGraphQLPath } from './helpers'
import { ApolloServer } from 'apollo-server-express'
import { defineContext } from './infra/context'
import depthLimit from 'graphql-depth-limit'
import compression from 'compression'
import { createServer } from 'http'
import { schema } from './schema'
import express from 'express'
import cors from 'cors'

const PATH: string = getGraphQLPath()
const PORT: number = getPort()
const HOST: string = getHost()

const app = express().use('*', cors()).use(compression())

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  playground: true,
  context: async (ctx: ExpressContext) => await defineContext(ctx)
})

server.applyMiddleware({ app, path: PATH })

createServer(app).listen({ port: PORT }, (): void => {
  console.log(`🚀\nGraphQL is now running on http://${HOST}:${PORT}${server.graphqlPath}`)
})
