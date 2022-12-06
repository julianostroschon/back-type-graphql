import { Knex, knex } from 'knex'
import { getConfig } from './config'

const connect = (database: string) => {
  const extra: Partial<Knex.Config> = {
    pool: {
      afterCreate: (conn: Knex, done: () => void) => {
        done()
      }
    }
  }

  return knex(getConfig(database, extra))
}

export default connect
