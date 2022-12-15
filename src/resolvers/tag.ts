import { Tag } from '../Entities/Tag';
import { TagInput } from '../Entities/TagInput';
import { applyDelete, applyInsert, applyUpdate, findOne } from '../helpers';
import { Query, Ctx, Resolver, Root, Arg, Mutation } from 'type-graphql';
import { Context } from '../contracts/general';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  async getTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag | undefined> {
    return await findOne(database, 'tags', ['*'], { id });
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
    const result = await applyDelete(database, 'tags', { id });

    return Boolean(result);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag> {
    const [first] = await applyUpdate<TagInput, Tag>(
      database,
      'tags',
      { id },
      data,
      ['*']
    );
    return first;
  }
}
