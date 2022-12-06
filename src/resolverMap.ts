import { GraphQLResolveInfo } from 'graphql'
import { Context } from './models'
import { IResolvers } from 'graphql-tools'

const resolverMap: IResolvers = {
  Query: {
    ping(_: void, args: void, ctx: Context, info: GraphQLResolveInfo): string {
      console.log(ctx, args, info)
      return `👋 Pong! 👋`
    }
  }
}

export default resolverMap
