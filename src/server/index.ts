import resolvers from './resolvers/'

async function buildServer(app: any, mercurius: any) {
  const opts = {
    schema: `type Query {
      ping: String!
      hello: String!
    }`,
    resolvers
  }

  app.register(mercurius, opts).post('/', (req: any, reply: any) => {
    return reply.graphql(req.body.query)
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
