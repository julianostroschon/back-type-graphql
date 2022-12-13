import { Knex } from 'knex';
import { getConfig } from '../../helpers';
import { defaultsDeep } from 'lodash';

function parseToInt(value: string): number {
  return parseInt(value, 10);
}

export const DATABASE: Knex.Config = {
  client: 'pg',
  version: '7.2',
  connection: {
    host: getConfig('DB_HOST', 'localhost'),
    port: parseToInt(getConfig('DB_PORT', '4432')),
    user: getConfig('DB_USER', 'root'),
    password: getConfig('DB_PASSWORD', 'root'),
    database: getConfig('DB_NAME', 'postgres'),
  },
  pool: { min: 0, max: 5, idleTimeoutMillis: 60000 },
};

export function getKnexConfig(database: string, extra = {}): Knex.Config {
  return defaultsDeep(
    { connection: { database } },
    extra,
    DATABASE
  ) as Knex.Config;
}
