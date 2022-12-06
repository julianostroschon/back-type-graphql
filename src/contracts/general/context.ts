import { Request } from 'apollo-server-express'
import { Knex } from 'knex'

type Context = {
  database: Knex
  req: Request
}

export { Context }
