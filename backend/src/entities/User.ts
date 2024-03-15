import { IsEmail, Length, Matches } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Length(3, 50)
  @Field()
  firstname!: string;

  @Column()
  @Length(3, 50)
  @Field()
  lastname!: string;

  @Column()
  @Length(3, 50)
  @Field()
  nickname!: string;

  @Column({ length: 150, unique: true })
  @Field()
  @IsEmail()
  email!: string;

  @Column()
  @Field()
  hashedPassword!: string;

  @CreateDateColumn()
  @Field()
  createdAt!: Date;

  @Column("boolean", { default: false })
  @Field()
  isAdmin!: boolean;

  @Column("boolean", { default: false })
  @Field()
  isPremium!: boolean;

  // @OneToOne(() => Image)
  // @JoinColumn()
  // image: Image;
}

@InputType()
export class UserCreateInput {
  @Length(3, 50)
  @Field()
  firstname!: string;

  @Length(3, 50)
  @Field()
  lastname!: string;

  @Length(3, 50)
  @Field()
  nickname!: string;

  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @Matches(/^.{8,50}$/)
  password!: string;
}

@InputType()
export class UserUpdateInput {
  @Field({ nullable: true })
  @Length(3, 50)
  firstname?: string;

  @Field({ nullable: true })
  @Length(3, 50)
  lastname?: string;

  @Field({ nullable: true })
  @Length(3, 50)
  nickname?: string;

}

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}

