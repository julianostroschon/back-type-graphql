import { buildCtxMock } from '../../stub-context';
import { UserResolver } from '../../../src/resolvers/user';

describe('Resolver createUser', () => {
  test('Deve retornar usuário com o id 3', () => {
    const { createUser } = new UserResolver();
    const { ctx, queries } = buildCtxMock(
      Promise.resolve([
        { id: '1', name: 'u Homem Macaco', email: 'arrobinha@dosguri' },
      ])
    );

    const [query] = queries;

    const args = {
      name: 'u Homem Macaco',
      email: 'arrobinha@dosguri',
      password: 'segredo',
    };

    expect(createUser({}, args, ctx)).resolves.toEqual({
      id: '1',
      name: 'u Homem Macaco',
      email: 'arrobinha@dosguri',
    });

    expect(ctx.database).toHaveBeenCalledTimes(1);
    expect(query.insert).toHaveBeenCalledTimes(1);
    expect(query.where).not.toHaveBeenCalled();
    expect(query.first).not.toHaveBeenCalled();

    expect(ctx.database).toHaveBeenCalledWith('users');
    expect(query.insert).toHaveBeenCalledWith({
      email: 'arrobinha@dosguri',
      name: 'u Homem Macaco',
      password: 'segredo',
    });
  });
});
