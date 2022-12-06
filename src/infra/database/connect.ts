import { Knex, knex } from 'knex'
import { getConfig } from './config'

const connect = (database: string) => {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (_: Knex, done: () => void) => {
        done()
      }
    }
  }

  return knex(getConfig(database, extra))
}

export default connect
