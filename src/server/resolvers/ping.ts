import { Mutation, Query, Resolver } from 'type-graphql';

@Resolver()
export class pingResolver {
  @Query(() => String)
  ping(): string {
    return `pong!`;
  }

  @Mutation(() => String)
  pong(): string {
    return `ping!`;
  }
}
