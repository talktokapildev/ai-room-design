//import {  } from "drizzle-orm/mysql-core";
import { serial, integer, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl").notNull(),
  credits: integer("credits").default(3),
});

export const AiGeneratedImage = pgTable("aiGeneratedImage", {
  id: serial("id").primaryKey(),
  roomType: varchar("roomType").notNull(),
  designType: varchar("designType").notNull(),
  orgImage: varchar("orgImage").notNull(),
  aiImage: varchar("aiImage").notNull(),
  userEmail: varchar("userEmail"),
});