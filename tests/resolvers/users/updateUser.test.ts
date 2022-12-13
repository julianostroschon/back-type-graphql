import { buildDbMock } from '../../../src/support/database';
import { UserResolver } from '../../../src/server/resolvers/user';

const user = {
  id: '2',
  name: 'DiegoDefante',
  email: 'World-Cup@ney.com',
  password: 'semHexa',
};

describe('Resolver readUser', () => {
  test('Deve retornar o usuario modificado', () => {
    const { updateUser } = new UserResolver();
    const { database, queries } = buildDbMock(Promise.resolve([user]));
    const [query] = queries;
    const args = {
      id: '1',
      name: 'casaGrande',
      email: 'tebinho@galvao.com',
      password: 'poiséné',
    };
    const ctx = { database, user };
    expect(updateUser({}, args, ctx)).resolves.toEqual({
      id: '2',
      name: 'DiegoDefante',
      email: 'World-Cup@ney.com',
      password: 'semHexa',
    });

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.update).toHaveBeenCalledTimes(1);
  });
});
