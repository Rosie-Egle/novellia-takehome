import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { pets } from "./schema/pets";
import { databaseConfig } from "./databaseConfig";

const pool = new Pool(databaseConfig);

export const schema = {
  pets,
};

export const dbClient = drizzle(pool, {
  schema,
});
