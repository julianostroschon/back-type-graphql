import { Tag } from '../Entities/Tag';
import { TagInput } from '../Entities/TagInput';
import { applyDelete, applyInsert, applyUpdate, findOne } from '../helpers';
import { Query, Ctx, Resolver, Root, Arg, Mutation } from 'type-graphql';
import { Context, DefaultObject } from '../contracts/general';

const TABLE_TAG = 'tags';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  async getTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag | undefined> {
    return await findOne(database, TABLE_TAG, id);
  }

  @Mutation(() => Tag)
  async createTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Ctx() { database }: Context
  ): Promise<Tag> {
    const [first] = await applyInsert<TagInput, Tag>(
      database,
      TABLE_TAG,
      data,
      ['*']
    );
    return first;
  }

  @Mutation(() => Boolean)
  async deleteTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<boolean> {
    const result = await applyDelete(database, TABLE_TAG, id);

    return Boolean(result);
  }

  @Mutation(() => Tag)
  async updateTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag> {
    data as DefaultObject;
    const [first] = await applyUpdate(
      database,
      TABLE_TAG,
      { id },
      { ...data },
      ['*']
    );
    return first as Tag;
  }
}
