import { pingResolver } from '../src/resolvers/ping';

describe('Resolver Ping', () => {
  test('Deve retornar `pong`', () => {
    const resolver = new pingResolver();
    expect(resolver.ping()).toEqual(`pong!`);
  });
});
