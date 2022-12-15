import { Tag } from '../Entities/Tag';
import { TagInput } from '../Entities/TagInput';
import { applyDelete, applyInsert, applyUpdate, findOne } from '../helpers';
import { Query, Ctx, Resolver, Root, Arg, Mutation } from 'type-graphql';
import { Context, DefaultObject } from '../contracts/general';
import { TAGS } from '../support/constants';

// const TAGS = 'tags';

@Resolver()
export class TagResolver {
  @Query(() => Tag)
  async getTag(
    @Root() _: any,
    @Arg('id') id: string,
    @Ctx() { database }: Context
  ): Promise<Tag | undefined> {
    return await findOne(database, TAGS, id);
  }

  @Mutation(() => Tag)
  async createTag(
    @Root() _: any,
    @Arg('data') data: TagInput,
    @Ctx() { database }: Context
  ): Promise<Tag> {
    const [first] = await applyInsert<TagInput, Tag>(database, TAGS, data, [
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
    const result = await applyDelete(database, TAGS, id);

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
    const [first] = await applyUpdate(database, TAGS, { id }, { ...data }, [
      '*',
    ]);
    return first as Tag;
  }
}
