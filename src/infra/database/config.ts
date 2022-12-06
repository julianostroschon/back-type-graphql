import { Knex } from 'knex'
import { defaultsDeep } from 'lodash'
// import fs from 'fs'

import { DATABASE } from './database-config'

// const ssl = ((option) => {
//   if (option === undefined) {
//     return false
//   }

//   if (option === 'yes') {
//     return true
//   }

//   if (option.indexOf('.crt') > 0) {
//     return {
//       rejectUnauthorized: true,
//       ca: fs.readFileSync(option).toString()
//     }
//   }

//   throw new Error(`DB_SSL: ${option} is not valid option`)
// })(DATABASE.ssl)

const config: Knex.Config = Object.freeze({
  client: 'pg',
  pool: { min: 0, max: 5, idleTimeoutMillis: 30000 },
  connection: Object.freeze({
    port: DATABASE.port,
    host: DATABASE.host,
    user: DATABASE.user,
    password: DATABASE.password,
    database: DATABASE.name
    // ssl
  })
})

const getConfig = (database: string, extra = {}): Knex.Config => {
  const dbName = `${DATABASE.prefix}${database}`

  return defaultsDeep({ connection: { database: dbName } }, extra, config)
}

export { getConfig }
