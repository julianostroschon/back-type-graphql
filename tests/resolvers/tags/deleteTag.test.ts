import { buildDbMock } from '../../../src/support/database';
import { TagResolver } from '../../../src/server/resolvers/tag';

describe('Resolver readUser', () => {
  test('Deve deletar o usuario', () => {
    const { deleteTag } = new TagResolver();
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' };
    const { database, queries } = buildDbMock(
      Promise.resolve([{ id: '1', name: 'dev', description: 'typefs' }])
    );

    const ctx = { database, user };
    const [query] = queries;
    const id = '2';

    expect(deleteTag({}, id, ctx)).resolves.toEqual(true);

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.delete).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledTimes(1);

    expect(database).toHaveBeenCalledWith('tags');
    expect(query.delete).toHaveBeenCalledWith();
    expect(query.where).toHaveBeenCalledWith({ id: '2' });
  });
});
