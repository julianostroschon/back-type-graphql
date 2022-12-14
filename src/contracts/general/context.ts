import { Knex } from 'knex';
import { User } from '../../Entities/User';

interface Context {
  database: Knex;
  user: User;
}

export { Context };
