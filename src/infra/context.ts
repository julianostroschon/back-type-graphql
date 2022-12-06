import { database } from './database'
import { Context } from '../contracts/general/context'

const defineContext = async ({ req }: any): Promise<Context> => {
  return {
    database,
    req
  }
}

export { defineContext }
