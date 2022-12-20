import { Query, Mutation, Ctx, Resolver, Root, Arg } from 'type-graphql';
import { Knex } from 'knex';
import { Logger } from 'pino';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

import { User } from '../Entities/User';
import { applyInsert } from '../helpers';
import { UserInput } from '../Entities/UserInput';
import { AuthInput, Auth } from '../Entities/Auth';
import { Context } from '../contracts/general';
import { USERS } from '../support/constants';
import { ValidationError, AppError } from '../support';
import { auth } from '../infra/database/config';

const SELECT_USER = ['id', 'name', 'email', 'password', 'status', 'deleted_at'];

const getUser = async (
  database: Knex,
  logger: Logger,
  email: string
): Promise<User | AppError> => {
  try {
    const user = (await database('users')
      .select(SELECT_USER)
      .where({ email })
      .first()) as User;

    return user;
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Failed to connect to the database error ${error.message}`);
    }

    return await Promise.reject(AppError.build('unexpected', error as Error));
  }
};

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
    @Ctx() { database, logger }: Context
  ): Promise<User | ValidationError> {
    const user = (await database(USERS).where({ id }).first()) as
      | User
      | undefined;

    if (!user) {
      logger.warn(`User with id ${id} not found`);
      return await Promise.reject(ValidationError.build('invalid user'));
    }

    return user;
  }

  @Mutation(() => User)
  async createUser(
    @Root() _: any,
    @Arg('data') data: UserInput,
    @Ctx() { database }: Context
  ): Promise<User> {
    const [first] = await applyInsert<UserInput, User>(database, USERS, data, [
      '*',
    ]);
    return first;
  }

  @Mutation(() => Auth)
  async auth(
    @Root() _: any,
    @Arg('data') data: AuthInput,
    @Ctx() { database, logger }: Context
  ): Promise<{
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }> {
    const user = await getUser(database, logger, data.email);

    if (!user) {
      logger.warn(`User not found: ${data.email}`);
      return await Promise.reject(ValidationError.build('Invalid credentials'));
    }

    const isValidPassword = await argon2.verify(
      user.password as string,
      data.password
    );

    if (!isValidPassword) {
      logger.warn(`Password not match: ${user.email as string}`);
      return await Promise.reject(ValidationError.build('Invalid credentials'));
    }

    const token = jwt.sign(
      { id: user.id as string, email: user.email as string },
      auth.JWT_KEY,
      {
        expiresIn: '2h',
      }
    );

    return {
      token,
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email as string,
      },
    };
  }
}
