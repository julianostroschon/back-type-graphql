import { gql } from "apollo-server-core"
import { ApolloServer } from "apollo-server-express"

/**
 * It builds the GraphQL server
 * @returns A server
 */
export const buildServer = async () => {
  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
      },
      `,
    resolvers: {
      Query: {
        ping: () => "pong"
      }
    },
  })
  return server
}