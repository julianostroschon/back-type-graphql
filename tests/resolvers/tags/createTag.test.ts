import { buildCtxMock } from '../../stub-context';
import { TagResolver } from '../../../src/resolvers/tag';

describe('Resolver CreateTag', () => {
  test('Deve criar a tag', async () => {
    const resolver = new TagResolver();
    const { ctx, queries } = buildCtxMock(
      Promise.resolve([{ id: '1', name: 'dev', description: 'typefs' }])
    );
    const [query] = queries;

    const args = { name: 'dev', description: 'typefs' };

    await expect(resolver.createTag({}, args, ctx)).resolves.toEqual({
      id: '1',
      name: 'dev',
      description: 'typefs',
    });

    expect(ctx.database).toHaveBeenCalledTimes(1);
    expect(query.insert).toHaveBeenCalledTimes(1);
    expect(query.where).not.toHaveBeenCalled();
    expect(query.first).not.toHaveBeenCalled();

    expect(ctx.database).toHaveBeenCalledWith('tags');
    expect(query.insert).toHaveBeenCalledWith({
      name: 'dev',
      description: 'typefs',
    });
  });
});
