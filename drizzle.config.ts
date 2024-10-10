import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://formio_owner:8CH6MRtIFTUJ@ep-billowing-band-a59qr6tz.us-east-2.aws.neon.tech/formio?sslmode=require",
  },
});
