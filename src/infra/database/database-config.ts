import { Knex } from 'knex'
import { getConfig } from '../../helpers'

function parseToInt(value: string): number {
  return parseInt(value, 10)
}

export const DATABASE: Knex.Config = {
  client: 'pg',
  version: '7.2',
  connection: {
    host: getConfig('DB_HOST', 'localhost'),
    port: parseToInt(getConfig('DB_PORT', '4432')),
    user: getConfig('DB_USER', 'root'),
    password: getConfig('DB_PASSWORD', 'root'),
    database: getConfig('DB_NAME', 'postgres')
  }
}
