import { createContainer } from './database'
import { Context } from '../contracts/general/context'

const defineContext = async (): Promise<Context> => {
  return {
    database: createContainer()
  }
}

export { defineContext }
