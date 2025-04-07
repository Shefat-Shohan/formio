import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: `${process.env.DATABASE_URL_CONFIG}`,
  },
});