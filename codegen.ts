import type { CodegenConfig } from '@graphql-codegen/cli'

import { getHostApi } from './src/helpers'

const config: CodegenConfig = {
  overwrite: true,
  schema: getHostApi(),
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers']
    },
    './graphql.schema.json': {
      plugins: ['introspection']
    }
  }
}

export default config
