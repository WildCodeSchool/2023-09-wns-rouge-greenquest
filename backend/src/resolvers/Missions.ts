import { validate } from "class-validator";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Mission, MissionCreateInput } from "../entities/Mission";

@Resolver(Mission)
export class MissionResolver {
  @Query(() => [Mission])
  async getMissions() {
    const Missions = await Mission.find();
    return Missions;
  }

  @Mutation(() => Mission)
  async createMission(
    @Arg("data", () => MissionCreateInput) data: MissionCreateInput
  ): Promise<Mission> {
    const newMission = new Mission();

    Object.assign(newMission, data);

    const errors = await validate(newMission);

    if (errors.length === 0) {
      await newMission.save();
      return newMission;
    } else {
      throw new Error(`Validation failed!`);
    }
  }
}
