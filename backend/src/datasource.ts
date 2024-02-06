import "dotenv/config";
import { DataSource } from "typeorm";
import { Mission } from "./entities/Mission";
import { Quest } from "./entities/Quest";
import { User } from "./entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  // Penser à ajouter nos entités ici quand elles seront créées
  entities: [User, Quest, Mission],
  synchronize: true,
  logging: true,
});
