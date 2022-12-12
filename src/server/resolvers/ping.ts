import { Mutation, Query, Resolver } from 'type-graphql'

@Resolver()
export class pingResolver {
  @Query(() => String)
  ping() {
    return `pong!`
  }
  @Mutation(() => String)
  pong() {
    return `ping!`
  }
}
