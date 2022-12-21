import { buildCtxMock } from '../../stub-context';
import { TagResolver } from '../../../src/resolvers/tag';

describe('Resolver getTag', () => {
  test('Deve retornar uma tag', () => {
    const resolver = new TagResolver();
    const { ctx, queries } = buildCtxMock(
      Promise.resolve({ id: '1', name: 'desenv', description: 'prog' })
    );

    const [query] = queries;

    const id = '1';

    expect(resolver.getTag({}, id, ctx)).resolves.toEqual({
      id: '1',
      name: 'desenv',
      description: 'prog',
    });

    expect(ctx.database).toHaveBeenCalledTimes(1);
    expect(query.where).toHaveBeenCalledTimes(1);
    expect(query.first).toHaveBeenCalledTimes(1);

    expect(ctx.database).toHaveBeenCalledWith('tags');
    expect(query.where).toHaveBeenCalledWith({ id: '1' });
    expect(query.first).toHaveBeenCalledWith();
  });
});
