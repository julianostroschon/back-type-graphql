import { getConfig } from './helpers'

export function getHost(): string {
  return getConfig('GRAPHQL_HOST', 'localhost')
}

export function getPort(): number {
  return parseInt(getConfig('GRAPHQL_PORT', '3000'))
}

export function getGraphQLPath() {
  return getConfig('GRAPHQL_PATH', '/graphql')
}
