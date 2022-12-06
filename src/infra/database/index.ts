import { DATABASE } from './database-config'
import { knex } from 'knex'

export const database = knex(DATABASE)
