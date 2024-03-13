import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import "dotenv/config";
import express from "express";
import http from "http";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";
import { MissionResolver } from "./resolvers/Missions";
import { QuestResolver } from "./resolvers/Quests";
import { UserResolver } from "./resolvers/Users";
import { customAuthChecker } from "./auth";

const port = process.env.BACK_PORT || 5050;

async function start() {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [UserResolver, QuestResolver, MissionResolver],
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await dataSource.initialize();

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: process.env.FRONT_URL,
      credentials: true,
    }),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(
    `🚀🚀🚀 Backend ready at http://localhost:${port}/ youhou 🚀🚀🚀`
  );
  console.log(
    `🚀🚀🚀 Frontend is running at : ${process.env.FRONT_URL} 🚀🚀🚀`
  );
}

start();
