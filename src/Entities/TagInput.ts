import { Field, InputType } from 'type-graphql';

@InputType()
export class TagInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
