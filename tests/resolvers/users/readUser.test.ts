import { buildDbMock } from '../../../src/support/database';
import { UserResolver } from '../../../src/server/resolvers/user';

const user = { id: '2', name: 'Juliano', email: 'arrobinha' };

describe('Resolver readUser', () => {
  test.only('Deve retornar a lista de usuários cadastrados', () => {
    const { getUsers } = new UserResolver();
    const { database, queries } = buildDbMock(
      Promise.resolve([
        { id: '3', name: 'Jesualdo', email: 'arrobinha@dosguri' },
        { id: '4', name: 'Jesualdo', email: 'arrobinha@dosguri' },
      ])
    );

    const ctx = { database, user };

    expect(getUsers({}, '', ctx)).resolves.toEqual([
      { id: '3', name: 'Jesualdo', email: 'arrobinha@dosguri' },
      { id: '4', name: 'Jesualdo', email: 'arrobinha@dosguri' },
    ]);

    expect(database).toHaveBeenCalledTimes(1);
    expect(queries[0].whereNotNull).toHaveBeenCalledTimes(1);

    expect(database).toHaveBeenCalledWith('users');
    expect(queries[0].whereNotNull).toHaveBeenCalledWith('deleted_at');
  });
  test('Deve retornar lista vazia', () => {
    const { getUsers } = new UserResolver();
    const { database, queries } = buildDbMock(Promise.resolve([]));
    const [query] = queries;

    const ctx = { database, user };

    expect(getUsers({}, '', ctx)).resolves.toEqual([]);

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.whereNotNull).toHaveBeenCalledTimes(1);

    expect(database).toHaveBeenCalledWith('users');
    expect(query.whereNotNull).toHaveBeenCalledWith('deleted_at');
  });
});
