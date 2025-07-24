import {
  text,
  pgTable,
  timestamp,
  uuid,
  pgEnum,
  date,
} from "drizzle-orm/pg-core";

export const animalTypeEnum = pgEnum("animal_type", [
  "DOG",
  "CAT",
  "BIRD",
  "HAMSTER",
  "HORSE",
  "OTHER",
]);

export const pets = pgTable("pets", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  animalType: animalTypeEnum("animal_type").notNull(),
  ownerName: text("owner_name").notNull(),
  dob: date("dob").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Quote = typeof pets.$inferSelect;
