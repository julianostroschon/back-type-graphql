import { Field, InputType } from 'type-graphql';

@InputType()
export class UserInput {
  @Field()
  id?: string;

  @Field()
  name?: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: true })
  password: string;
}
