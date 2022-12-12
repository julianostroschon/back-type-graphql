import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: false })
  email: string

  @Field({ nullable: false })
  password: string
}
