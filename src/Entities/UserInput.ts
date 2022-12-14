import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field({ nullable: true })
  id?: string;
}
