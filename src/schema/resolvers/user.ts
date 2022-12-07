import { User } from '../../Entities/User';
import { Query, Ctx, Resolver, Root, Arg } from 'type-graphql';
import { Context } from 'contracts/general';

@Resolver()
export class userResolver {
  @Query(() => User)
  async getContextUser(@Root() _: any, @Arg('id') id: string, @Ctx() ctx: Context) {
    console.log(ctx, id);
    return ctx;
  }
}
