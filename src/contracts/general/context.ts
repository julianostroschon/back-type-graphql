import { Knex } from 'knex';

type User = {
  name: string;
  email: string;
  password: string;
};

type Context = {
  database: Knex;
  user: User;
};

export { Context };
