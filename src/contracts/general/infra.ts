import { Knex } from 'knex'

interface DatabaseContainer {
  get: (datasource: string) => Knex
  destroy: () => Promise<void>
}

export { DatabaseContainer }
