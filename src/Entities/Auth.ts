import { Field, InputType, ObjectType } from 'type-graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class AuthInput {
  @Field()
  @MaxLength(30)
  email: string;

  @Field()
  @MaxLength(30)
  password: string;
}

@ObjectType()
export class UserAuth {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: false })
  email: string;
}

@ObjectType()
export class Auth {
  @Field()
  token: string;

  @Field()
  user: UserAuth;
}
