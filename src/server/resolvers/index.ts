// import * as mutations from './mutations';
import * as queries from './query/ping'

const resolvers = {
  Query: {
    ...queries
  }
  // Mutation: {
  //   ...mutations,
  // },
}

export default resolvers
