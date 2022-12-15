import { buildDbMock } from '../../../src/support/database';
import { TagResolver } from '../../../src/server/resolvers/tag';

describe('Resolver getTag', () => {
  test('Deve retornar uma tag', () => {
    const { getTag } = new TagResolver();
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' };
    const { database, queries } = buildDbMock(
      Promise.resolve({ id: '1', name: 'desenv', description: 'prog' })
    );

    const ctx = { database, user };
    const [query] = queries;

    const id = '1';

    expect(getTag({}, id, ctx)).resolves.toEqual({
      id: '1',
      name: 'desenv',
      description: 'prog',
    });

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledTimes(1);
    expect(query.first).toHaveBeenCalledTimes(1);

    expect(database).toHaveBeenCalledWith('tags');
    expect(query.where).toHaveBeenCalledWith({ id: '1' });
    expect(query.first).toHaveBeenCalledWith();
  });
});
