import { buildDbMock } from '../../../src/support/database';
import { UserResolver } from '../../../src/resolvers/user';

describe('Resolver getUser', () => {
  test('Deve retornar usuário com o id 3', () => {
    const { createUser } = new UserResolver();
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' };
    const { database, queries } = buildDbMock(
      Promise.resolve([
        { id: '1', name: 'u Homem Macaco', email: 'arrobinha@dosguri' },
      ])
    );

    const ctx = { database, user };
    const [query] = queries;

    const args = { name: 'u Homem Macaco', email: 'arrobinha@dosguri' };

    expect(createUser({}, args, ctx)).resolves.toEqual({
      id: '1',
      name: 'u Homem Macaco',
      email: 'arrobinha@dosguri',
    });

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.insert).toHaveBeenCalledTimes(1);
    expect(query.where).not.toHaveBeenCalled();
    expect(query.first).not.toHaveBeenCalled();

    expect(database).toHaveBeenCalledWith('users');
    expect(query.insert).toHaveBeenCalledWith(
      { email: 'arrobinha@dosguri', name: 'u Homem Macaco' },
      ['*']
    );
  });
});
