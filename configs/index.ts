import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://formio_owner:8CH6MRtIFTUJ@ep-billowing-band-a59qr6tz.us-east-2.aws.neon.tech/formio?sslmode=require"
);
// const sql = neon(
//   "YOUR_DATABASE_KEY"
// );
export const db = drizzle(sql, { schema });
