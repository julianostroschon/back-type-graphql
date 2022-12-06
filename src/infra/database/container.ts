import { Knex } from 'knex'
import { DatabaseContainer } from '../../contracts/general'
import connect from './connect'

const createContainer = (): DatabaseContainer => {
  const cache: Record<string, Knex> = {}

  return {
    get(datasource: string): Knex {
      if (!cache[datasource]) {
        cache[datasource] = connect(datasource)
      }

      return cache[datasource]
    },
    async destroy() {
      const promises = Object.values(cache).map(async (conn) => {
        return conn.destroy().catch((err) => {
          console.log(`[conn destroy] ${err.message}`)
        })
      })

      await Promise.all(promises)
    }
  }
}

export { createContainer }
