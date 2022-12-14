import { getConfig } from './environment';

export function getHost(): string {
  return getConfig('GRAPHQL_HOST', 'localhost');
}

export function getPort(): number {
  return parseInt(getConfig('GRAPHQL_PORT', '3000'));
}

export function getGraphQLPath(): string {
  return getConfig('GRAPHQL_PATH', '/graphql');
}

export function getHostApi(): string {
  const path = getGraphQLPath();
  const host = getHost();
  const port = getPort();
  return `http://${host}:${port}${path}`;
}
