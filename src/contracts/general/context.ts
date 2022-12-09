import { User } from 'Entities/User';
import { Knex } from 'knex';

type Context = {
  database: Knex;
  user: User;
};

export { Context };
