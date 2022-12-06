import { GraphQLResolveInfo } from 'graphql'
import { Context } from './models'
import { IResolvers } from 'graphql-tools'

const resolverMap: IResolvers = {
  Query: {
    ping: async (root: void, args: void, ctx: Context, info: GraphQLResolveInfo): Promise<string> => {
      console.log(root, args, ctx, info)
      return `👋 Pong! 👋`
    }
  }
}

export default resolverMap
