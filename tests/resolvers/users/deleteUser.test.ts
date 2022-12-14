import { buildDbMock } from '../../../src/support/database';
import { UserResolver } from '../../../src/server/resolvers/user';

const user = {
  id: '2',
  name: 'DiegoDefante',
  email: 'World-Cup@ney.com',
  password: 'semHexa',
};

describe('Resolver readUser', () => {
  test('Deve deletar o usuario `true`', () => {
    const { deleteUser } = new UserResolver();
    const { database, queries } = buildDbMock(Promise.resolve([user]));
    const [query] = queries;
    const ctx = { database, user };
    expect(deleteUser({}, { id: '2' }, ctx)).resolves.toEqual(true);

    expect(database).toHaveBeenCalledTimes(1);
    expect(database).toHaveBeenCalledWith('users');
    expect(query.delete).toHaveBeenCalledTimes(1);
    expect(query.delete).toHaveBeenCalledWith();
    expect(query.where).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledWith({ id: '2' });
  });

  test('Deve retornar `false`', () => {
    const { deleteUser } = new UserResolver();
    const { database, queries } = buildDbMock(Promise.resolve(false));
    const [query] = queries;
    const ctx = { database, user };
    expect(deleteUser({}, { id: '2' }, ctx)).resolves.toEqual(false);
  });
});
