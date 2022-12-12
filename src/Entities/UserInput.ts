import { Field, InputType } from 'type-graphql'

@InputType()
export class UserInput {
  @Field()
  name?: string

  @Field({ nullable: false })
  email: string

  @Field({ nullable: true })
  password: string
}
