import { validate } from "class-validator";
import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Quest, QuestCreateInput } from "../entities/Quest";
import { Mission } from "../entities/Mission";

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
  async getQuestById(@Arg("id", () => ID) id: number): Promise<Quest> {
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
    newQuest.title = data.title;
    newQuest.description = data.description;
    newQuest.startDate = data.startDate;
    newQuest.duration = data.duration;
    newQuest.difficulty = data.difficulty;

    const errors = await validate(newQuest);
    if (errors.length > 0) {
      throw new Error(
        `Validation failed: ${errors.map((err) => err.toString()).join(", ")}`
      );
    }

    if (data.missions && data.missions.length > 0) {
      const missions = await Mission.findByIds(data.missions);
      newQuest.missions = missions;
    }

    await newQuest.save();

    return newQuest;
  }
}
