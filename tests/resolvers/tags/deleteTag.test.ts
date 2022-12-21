import { buildCtxMock } from '../../stub-context';
import { TagResolver } from '../../../src/resolvers/tag';

describe('DeleteTag', () => {
  test('Deve deletar a tag', () => {
    const { deleteTag } = new TagResolver();

    const { ctx, queries } = buildCtxMock(
      Promise.resolve([{ id: '1', name: 'dev', description: 'typefs' }])
    );

    const [query] = queries;
    const id = '2';

    expect(deleteTag({}, id, ctx)).resolves.toEqual(true);

    expect(ctx.database).toHaveBeenCalledTimes(1);
    expect(query.delete).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledTimes(1);

    expect(ctx.database).toHaveBeenCalledWith('tags');
    expect(query.delete).toHaveBeenCalledWith();
    expect(query.where).toHaveBeenCalledWith({ id: '2' });
  });
});
