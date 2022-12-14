import { Tag } from '../../Entities/Tag';
import { TagInput } from '../../Entities/TagInput';
import { applyDelete, applyInsert, applyUpdate, findOne } from '../../helpers';
import { Query, Ctx, Resolver, Root, Arg, Mutation } from 'type-graphql';
import { Context } from '../../contracts/general';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  async getTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag | undefined> {
    return findOne(database, 'tags', ['*'], { id });
  }

  @Mutation(() => Tag)
  async createTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Ctx() { database }: Context
  ): Promise<Tag> {
    const [first] = await applyInsert<TagInput, Tag>(database, 'tags', data, [
      '*',
    ]);
    return first;
  }

  @Mutation(() => Boolean)
  async deleteTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<boolean> {
    return !!applyDelete(database, 'tags', id);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag | any> {
    const [first] = await applyUpdate(database, 'tags', { id }, data, ['*']);
    return first;
  }
}
