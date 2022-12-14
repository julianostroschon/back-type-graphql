import { buildDbMock } from '../../../src/support/database';
import { TagResolver } from '../../../src/server/resolvers/tag';

describe('Resolver UpdateTag', () => {
  test('Deve editar a tag', () => {
    const { updateTag } = new TagResolver();
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' };
    const { database, queries } = buildDbMock(
      Promise.resolve([{ id: '1', name: 'TI', description: 'aliases' }])
    );

    const ctx = { database, user };
    const [query] = queries;

    const argData = { name: 'TI', description: 'aliases' };
    const argId = '1';

    expect(updateTag({}, argData, argId, ctx)).resolves.toEqual({
      id: '1',
      name: 'TI',
      description: 'aliases',
    });

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledTimes(1);
    expect(query.update).toHaveBeenCalledTimes(1);
    expect(query.first).not.toHaveBeenCalled();

    expect(database).toHaveBeenCalledWith('tags');
    expect(query.where).toHaveBeenCalledWith({ id: '1' });
    expect(query.update).toHaveBeenCalledWith(
      { name: 'TI', description: 'aliases' },
      ['*']
    );
  });
});
