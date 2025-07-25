import { text, pgTable, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core";
import { pets } from "./pets";

export const severityEnum = pgEnum("severity", ["MILD", "SEVERE"]);
export const reactionEnum = pgEnum("reaction", [
  "HIVES",
  "DIARRHEA",
  "RASH",
  "FEVER",
  "OTHER",
]);

export const allergy = pgTable("allergy", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  severity: severityEnum("severity").notNull(),
  reactions: reactionEnum("reactions").array().notNull(),
  petId: uuid("pet_id")
    .references(() => pets.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Quote = typeof allergy.$inferSelect;
