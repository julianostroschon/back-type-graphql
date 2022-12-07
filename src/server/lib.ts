import { TypeSource } from '@graphql-tools/utils'
import { loadFiles } from '@graphql-tools/load-files'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import path from 'path'

async function loadTypes(basePath: string, extensions: string[], relativePath: string): Promise<TypeSource> {
  const types = await loadFiles(path.join(basePath, relativePath), { extensions })
  return mergeTypeDefs(types)
}

async function loadResolvers(basePath: string, relativePath: string): Promise<any> {
  const resolvers = await loadFiles(path.join(basePath, relativePath))
  return mergeResolvers(resolvers)
}

export async function buildSchema(typeDefsInfo: any, resolversInfo: any): Promise<any> {
  const typeDefsArr = await loadTypes(
    typeDefsInfo.basePath,
    typeDefsInfo.extensions,
    typeDefsInfo.relativePath
  )
  const resolversArray = await loadResolvers(resolversInfo.basePath, resolversInfo.relativePath)

  const [typeDefs, resolvers] = await Promise.all([typeDefsArr, resolversArray.default])

  return {
    typeDefs,
    resolvers
  }
}
