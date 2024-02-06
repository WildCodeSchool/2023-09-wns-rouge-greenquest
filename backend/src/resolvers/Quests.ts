import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Quest, QuestCreateInput } from "../entities/Quest";

@Resolver(Quest)
export class QuestResolver {
  @Query(() => [Quest])
  async getQuests() {
    const Quests = await Quest.find({
      relations: { missions: true },
    });
    return Quests;
  }

  @Query(() => Quest)
  async getQuestById(@Arg("id") id: number): Promise<Quest> {
    const quest = await Quest.findOne({
      where: { id },
      relations: { missions: true },
    });

    if (!quest) {
      throw new Error("Pas de quête liée à cette 'id'");
    }
    return quest;
  }

  @Mutation(() => Quest)
  async createQuest(
    @Arg("data", () => QuestCreateInput) data: QuestCreateInput
  ): Promise<Quest> {
    const newQuest = new Quest();

    Object.assign(newQuest, data);

    const errors = await validate(newQuest);

    if (errors.length === 0) {
      await newQuest.save();
      return newQuest;
    } else {
      throw new Error(`Validation failed!`);
    }
  }
}
