import { pingResolver } from '../src/server/resolvers/ping'

describe('Resolver Ping', () => {
  test('Deve retornar `pong`', () => {
    const resolver = new pingResolver()
    expect(resolver.ping()).toEqual(`pong!`)
  })
})
