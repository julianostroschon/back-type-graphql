import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'

export async function buildTypeDefs() {
  const typesArray = await loadFiles(path.join(__dirname, '../schema'), {
    extensions: ['graphql']
  })
  return mergeTypeDefs(typesArray)
}
