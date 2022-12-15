import { buildDbMock } from '../../../src/support/database';
import { TagResolver } from '../../../src/server/resolvers/tag';

describe('Resolver CreateTag', () => {
  test('Deve criar a tag', () => {
    const { createTag } = new TagResolver();
    const user = { id: '2', name: 'Juliano', email: 'arrobinha' };
    const { database, queries } = buildDbMock(
      Promise.resolve([{ id: '1', name: 'dev', description: 'typefs' }])
    );

    const ctx = { database, user };
    const [query] = queries;

    const args = { name: 'dev', description: 'typefs' };

    expect(createTag({}, args, ctx)).resolves.toEqual({
      id: '1',
      name: 'dev',
      description: 'typefs',
    });

    expect(database).toHaveBeenCalledTimes(1);
    expect(query.insert).toHaveBeenCalledTimes(1);
    expect(query.where).not.toHaveBeenCalled();
    expect(query.first).not.toHaveBeenCalled();

    expect(database).toHaveBeenCalledWith('tags');
    expect(query.insert).toHaveBeenCalledWith({
      name: 'dev',
      description: 'typefs',
    });
  });
});
