import { database } from './database'
import { Context } from '../contracts/general/context'

const defineContext = async (): Promise<Context> => {
  return {
    database
  }
}

export { defineContext }
