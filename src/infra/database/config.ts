import { Knex } from 'knex';
import { defaultsDeep } from 'lodash';

const config = Object.freeze({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? '4431',
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_NAME ?? 'postgres',
  },
  pool: { min: 0, max: 5, idleTimeoutMillis: 60000 },
});

export function getKnexConfig(database: string, extra = {}): Knex.Config {
  return defaultsDeep(
    { connection: { database } },
    extra,
    config
  ) as Knex.Config;
}

export const auth = Object.freeze({
  JWT_KEY: process.env.AUTH_JWT_KEY ?? '111.[111,2222]',
});
