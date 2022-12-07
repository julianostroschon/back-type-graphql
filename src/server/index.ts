import { buildSchema } from './lib'
import * as resolverUnique from './resolvers/'
async function buildServer(app: any, mercurius: any) {
  const basePath = __dirname
  const typeDefsInfo = {
    basePath,
    relativePath: '../schema',
    extensions: ['graphql']
  }
  const resolversInfo = {
    basePath,
    relativePath: './resolvers'
  }

  const { typeDefs } = await buildSchema(typeDefsInfo, resolversInfo)
  const schema = { typeDefs, resolvers: resolverUnique.default }
  console.log({ schema })
  app.register(mercurius, schema).get('/', (_: any, reply: any) => {
    console.log(reply)
    const query = `{ hello }`

    return reply.graphql(query, _)
  })

  return {
    /**
     *
     * @param {number} port - Port to listen a server
     * @returns {Promise<{url: string}>}
     */
    async listen(port: string | number) {
      await app.listen({ port })
      const url = `http://localhost:${port}`
      return { url }
    },
    /**
     * Stop the application
     * @returns {Promise<void>}
     */
    async stop() {
      return app.close()
    }
  }
}

export default buildServer
