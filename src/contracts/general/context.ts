import { Knex } from 'knex';
import { Logger } from 'pino';

interface Context {
  database: Knex;
  user: UserCtx;
  logger: Logger;
}

interface UserCtx {
  id: string;
  name: string;
  email: string;
}

export { Context, UserCtx };
