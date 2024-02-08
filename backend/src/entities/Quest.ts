import {
  Field,
  ID,
  InputType,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Mission } from "./Mission";
import { ObjectID } from "./ObjectId";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

registerEnumType(Difficulty, {
  name: "Difficulty",
});

@Entity()
@ObjectType()
export class Quest extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column()
  @Field()
  title!: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description!: string;

  @Column()
  @Field()
  startDate!: Date;

  @Column()
  @Field()
  duration!: number;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  @Field()
  createdAt!: Date;

  @Column({ type: "enum", enum: Difficulty, default: Difficulty.EASY })
  @Field(() => Difficulty)
  difficulty!: Difficulty;

  @ManyToMany(() => Mission, (mission) => mission.quests)
  @Field(() => [Mission], { nullable: true })
  missions!: Mission[];
}

@InputType()
export class QuestCreateInput {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description!: string;

  @Field()
  startDate!: Date;

  @Field()
  duration!: number;

  @Field(() => Difficulty, { nullable: true })
  difficulty!: Difficulty;

  @Field(() => [ObjectID], { nullable: true })
  missions: ObjectID[];
}
