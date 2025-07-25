import { text, pgTable, timestamp, uuid, date } from "drizzle-orm/pg-core";
import { pets } from "./pets";

export const vaccine = pgTable("vaccine", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  dateReceived: date("date_received").notNull(),
  petId: uuid("pet_id")
    .references(() => pets.id, { onDelete: "cascade" })
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export type Quote = typeof vaccine.$inferSelect;
