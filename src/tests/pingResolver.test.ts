// import 'reflect-metadata';

const { pingResolver } = require('../server/resolvers/ping');

describe('Resolver Ping', () => {
  test('Deve retornar `pong`', () => {
    const resolver = new pingResolver();
    expect(resolver.ping()).toEqual(`pong!`);
  });
});
