import { Knex } from 'knex';
import { Logger } from 'pino';
import { User } from '../../Entities/User';

interface Context {
  database: Knex;
  user: User;
  logger: Logger;
}

export { Context };
