import { User } from '../../Entities/User';
import { applyInsert } from '../../helpers';
import { UserInput } from '../../Entities/UserInput';
import { Query, Mutation, Ctx, Resolver, Root, Arg } from 'type-graphql';
import { Context } from '../../contracts/general';

@Resolver()
export class UserResolver {
  /* A query that returns a user. */
  @Query(() => User)
  /**
   * "Get the user with the given id from the database and return it."
   *
   * The @Root() _: any argument is a special argument that is used to pass the root object of the query.
   * In this case, the root object is the user object that is being queried
   * @param {any} _ - any - This is the root object. In this case, it's the user object.
   * @param {string} id - The id of the user we want to retrieve.
   * @param {Context}  - Root() - The root object, in this case, the parent object.
   * @returns {Promise<User>} The user with the given id.
   */
  async getUser(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<User> {
    const user = (await database('users').where({ id }).first()) as User;

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Root() _: any,
    @Arg('data') data: UserInput,
    @Ctx() { database }: Context
  ): Promise<User> {
    const [first] = await applyInsert<UserInput, User>(
      database,
      'users',
      data,
      ['*']
    );
    return first;
  }
}
