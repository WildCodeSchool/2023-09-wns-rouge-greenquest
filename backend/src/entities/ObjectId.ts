import { Field, ID, InputType } from "type-graphql";

@InputType()
export class ObjectID {
  @Field(() => ID)
  id: number;
}
