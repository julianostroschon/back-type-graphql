// eslint-disable-next-line node/no-unpublished-import
import { AuthenticationError, ExpressContext } from 'apollo-server-express';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import { Knex } from 'knex';
import { Logger } from 'pino';
import { User } from '../../Entities/User';

import { auth } from '../../infra/database/config';

type Request = Pick<ExpressContext, 'req'>;

type GetToken = string | undefined;

export function getToken(ctx: Request): GetToken {
  const token =
    ctx.req?.headers.authorization ?? ctx.req?.headers.Authorization;

  return token as GetToken;
}

export async function loadUser(
  logger: Logger,
  conn: Knex,
  token: string | undefined
): Promise<User | Error> {
  try {
    if (!token) {
      return await Promise.reject(new Error('Missing token'));
    }

    logger.debug(`token: ${token}`);

    const { id, email } = verify(token, auth.JWT_KEY) as unknown as {
      id: string;
      email: string;
    };

    const user = (await conn('usuarios').where({ id, email }).first()) as User;

    return user || Promise.reject(new Error('Missing user'));
  } catch (err) {
    logger.warn({ action: 'loadUser', errorData: err });

    if (err instanceof JsonWebTokenError) {
      const gqlError = new AuthenticationError('Fail to validate token');
      gqlError.originalError = err;
      return await Promise.reject(gqlError);
    }

    return await Promise.reject(err);
  }
}
