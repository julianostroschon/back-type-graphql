import { User } from '../../Entities/User';
import {
  applyDelete,
  applyInsert,
  applyUpdate,
  findOne,
  findAll,
} from '../../helpers';
import { UserInput } from '../../Entities/UserInput';
import { Query, Mutation, Ctx, Resolver, Root, Arg } from 'type-graphql';
import { Context } from '../../contracts/general';
import { hashPassword } from './domains/user/index';
import { passwordUser } from '../../support/constants';

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
  ): Promise<User | undefined> {
    const user = await findOne<User | undefined>(database, 'users', id);
    if (!user) {
      return Promise.reject(new Error('Usuário não encontrado'));
    }
    return user;
  }

  async getUsers(
    @Root() _: any,
    @Arg('__') __: string,
    @Ctx() { database }: Context
  ): Promise<User[]> {
    return await findAll<User>(database, 'users');
  }

  @Mutation(() => User)
  async createUser(
    @Root() _: any,
    @Arg('data') data: UserInput,
    @Ctx() { database }: Context
  ): Promise<User> {
    const user = { ...data, password: hashPassword(passwordUser) };
    const [first] = await applyInsert<UserInput, User>(
      database,
      'users',
      data,
      ['*']
    );
    return first;
  }

  @Mutation(() => User)
  async updateUser(
    @Root() _: any,
    @Arg('data') data: UserInput,
    @Ctx() { database }: Context
  ): Promise<User> {
    const [userUpdated] = await applyUpdate<UserInput, User>(
      database,
      'users',
      data,
      { id: data.id }
    );
    return userUpdated;
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<boolean> {
    return !!(await applyDelete(database, 'users', id));
  }
}
