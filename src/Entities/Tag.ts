import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Tag {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
