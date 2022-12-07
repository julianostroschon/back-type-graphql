import { Knex } from 'knex';

type User = {
  name: string;
  password: string;
};

type Context = {
  database: Knex;
  user: User;
};

export { Context };
