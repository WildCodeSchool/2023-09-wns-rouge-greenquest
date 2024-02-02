import { Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers() {
    const Users = await User.find();
    return Users;
  }
}
