import { loadFiles } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import path from 'path'

export async function buildResolvers() {
  const resolversArray = await loadFiles(path.join(__dirname, './resolvers/**/index.ts'))

  return mergeResolvers(resolversArray)
}
