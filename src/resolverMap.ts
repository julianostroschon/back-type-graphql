import { GraphQLResolveInfo } from 'graphql'
import { Context } from './models'
import { IResolvers } from 'graphql-tools'

const resolverMap: IResolvers = {
  Query: {
    ping(_: void, __: void, ctx: Context, ___: GraphQLResolveInfo): string {
      console.log(ctx.database)
      return `👋 Pong! 👋`
    }
  }
}

export default resolverMap
