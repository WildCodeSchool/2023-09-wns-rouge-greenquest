import {
  Arg,
  ID,
  Query,
  Resolver,
  Mutation,
  Ctx,
  Authorized,
} from "type-graphql";
import { User, UserCreateInput, UserUpdateInput } from "../entities/User";
import { validate } from "class-validator";
import Cookies from "cookies";
import jwt from "jsonwebtoken";
import { ContextType } from "../auth";

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

  // query to get self profile
  @Authorized()
  @Query(() => User, { nullable: true })
  async mySelf(@Ctx() context: ContextType): Promise<User | null> {
    return context.req, context.res;
  }
  // query de Màj des data utilisateur
  @Authorized()
  @Mutation(() => User)
  async updateUser(
    @Arg("data", () => UserUpdateInput) data: UserUpdateInput,

    @Ctx() context: ContextType
  ): Promise<User> {

    // Extraction de l'identifiant de l'utilisateur à partir du contexte
    const userId = context?.user?.id;

    if (!userId) {
      throw new Error("Vous devez être connecté pour effectuer cette action");
    }

    const user = await User.findOneBy({ id: userId });

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Màj des données de l'utilisateur en fonction des données fournies
    if (data.firstname !== undefined) {
      user.firstname = data.firstname;
    }
    if (data.lastname !== undefined) {
      user.lastname = data.lastname;
    }
    if (data.nickname !== undefined) {
      user.nickname = data.nickname;
    }

    await user.save(); // ENregistrement en BDD

    return user;
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Ctx() context: { req: any; res: any },
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email });
    //verify if user exists
    if (existingUser) {
      const isPasswordValid = await argon2.verify(
        existingUser.hashedPassword,
        password
      );
      // verify if password is valid

      if (isPasswordValid) {
        const token = jwt.sign(
          {
            userId: existingUser.id,
          },
          `${process.env.JWT_SECRET}`
        );

        console.log(token);

        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 24,
        });

        return existingUser;
      } else {
        console.log(password, "wrong password");
        return null;
      }
    } else {
      console.log(existingUser, "user does not exists");
      return null;
    }
  }
}
