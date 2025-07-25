import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { pets } from "./schema/pets";
import { vaccine } from "./schema/vaccine";
import { allergy } from "./schema/allergy";
import { databaseConfig } from "./databaseConfig";

const pool = new Pool(databaseConfig);

export const schema = {
  pets,
  vaccine,
  allergy,
};

export const dbClient = drizzle(pool, {
  schema,
});
