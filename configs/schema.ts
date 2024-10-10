import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const JsonForm = pgTable("jsonForms", {
  id: serial("id").primaryKey(),
  jsonForm: text("jsonForm").notNull(),
  background: varchar("background"),
  style: varchar("style"),
  createBy: varchar("createdBy").notNull(),
  createAt: timestamp("createdAt").defaultNow().notNull(),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createBy: varchar("createBy").default("anonymous"),
  createAt: varchar("createAt").notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
});

export const aiInsight = pgTable("aiInsight", {
  id: serial("id").primaryKey(),
  inSightResponse: text("inSightResponse").notNull(),
  createBy: varchar("createBy").notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
});

export const aiNewsletter = pgTable("aiNewsletter", {
  id: serial("id").primaryKey(),
  newsletterResponse: text("newsletterResponse").notNull(),
  createBy: varchar("createBy").notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
});
