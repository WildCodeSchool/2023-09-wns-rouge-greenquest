import { Arg, ID, Query, Resolver, Mutation } from "type-graphql";
import { User, UserCreateInput } from "../entities/User";
import { validate } from "class-validator";

const argon2 = require("argon2");

// return all users
@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
  }
  // return one user
  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id: id },
    });
    return user;
  }

  // singup query
  @Mutation(() => User)
  async signup(
    @Arg("data", () => UserCreateInput) data: UserCreateInput
  ): Promise<User> {
    const errors = await validate(data);
    if (errors.length !== 0) {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }

    //custom error if user already exists
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error(`User already exists`);
    }

    //create new user with hashed password
    const newUser = new User();
    const hashedPassword = await argon2.hash(data.password);
    Object.assign(newUser, {
      firstname: data.firstname,
      lastname: data.lastname,
      nickname: data.nickname,
      email: data.email,
      hashedPassword,
    });

    await newUser.save();
    return newUser;
  }
}
