import { beforeAll, describe, expect, it } from "@jest/globals";
import { QuestResolver } from "../src/resolvers/Quests";
import { Difficulty, QuestCreateInput } from "../src/entities/Quest";
import { buildSchema } from "type-graphql";
import { graphql } from "graphql";
import { DataSource } from "typeorm";
import { dataSourceOptions } from "../src/datasource";
import { GraphQLSchema } from "graphql";

let dataSource: DataSource;
let schema: GraphQLSchema;

beforeAll(async () => {
  dataSource = new DataSource({
    ...dataSourceOptions,
    host: "127.0.0.1",
    port: 5433,
    username: "username",
    password: "password",
    database: "greenquest",
    dropSchema: true,
    logging: false,
  });

  await dataSource.initialize();

  schema = await buildSchema({
    resolvers: [QuestResolver],
  });
});

describe("create a new quest", () => {
  let createdQuestId: number;

  it("should create a new quest", async () => {
    const data: QuestCreateInput = {
      title: "Test Quest",
      description: "Description d'une quête test",
      startDate: new Date(),
      duration: 10,
      difficulty: Difficulty.EASY,
      missions: [],
    };

    const response = await graphql({
      schema,
      source: `
          mutation CreateQuest($data: QuestCreateInput!) {
            createQuest(data: $data) {
              id
              title
              startDate
              duration
              difficulty
            }
          }
        `,
      variableValues: { data },
    });

    const createQuest: any = response.data?.createQuest;
    createdQuestId = createQuest.id;

    expect(createQuest).toBeDefined();
    expect(createQuest).toHaveProperty("id");
    expect(createQuest).toHaveProperty("title", data.title);
    expect(createQuest).toHaveProperty(
      "startDate",
      data.startDate.toISOString()
    );
    expect(createQuest).toHaveProperty("duration", data.duration);
    expect(createQuest).toHaveProperty("difficulty", data.difficulty);
  });

  it("should find the created quest by its ID", async () => {
    const response = await graphql({
      schema,
      source: `
        query getQuestById($Id: ID!) {
          getQuestById(id: $Id) {
              id
              title
            }
          }
        `,
      variableValues: { Id: createdQuestId },
    });

    const foundQuest = response.data?.getQuestById;

    expect(foundQuest).toBeDefined();
    expect(foundQuest).toHaveProperty("id", createdQuestId);
  });
});
