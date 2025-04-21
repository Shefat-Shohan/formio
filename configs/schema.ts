import {
  boolean,
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
  isDeleted: boolean("isDeleted").notNull().default(false),
});

export const userResponses = pgTable("userResponses", {
  id: serial("id").primaryKey(),
  jsonResponse: text("jsonResponse").notNull(),
  createBy: varchar("createBy").default("anonymous"),
  createAt: varchar("createAt").notNull(),
  status: integer("status").default(0).notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
});

export const aiInsight = pgTable("aiInsight", {
  id: serial("id").primaryKey(),
  inSightResponse: text("inSightResponse").notNull(),
  createBy: varchar("createBy").notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
});

export const emailCampaign = pgTable("emailCampaign", {
  id: serial("id").primaryKey(),
  subject: text("subject").notNull(),
  assignedCustomer: text("assignedCustomer").default("0"),
  emailTemplate: text("emailTemplate").default("[]"),
  htmlEmailFormat: text("htmlEmailFormat").default(""),
  createdAt: varchar("createdAt").notNull(),
  createdBy: varchar("createdBy").notNull(),
  formRef: integer("formRef").references(() => JsonForm.id),
  sentimentType: text("sentimentType").notNull(),
});

export const aiSentiment = pgTable("aiSentiment", {
  id: serial("id").primaryKey(),
  sentimentResponse: text("sentimentResponse").notNull(),
  formRef: integer("formRef"),
  status: integer("status").default(0).notNull(),
});

export const subscription = pgTable("subscription", {
  id: serial("id").primaryKey(),
  userId: varchar("userId").notNull(),
  isSubscribed: boolean("isSubscribed").notNull().default(false),
  createAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow()
});
