import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { config } from "dotenv";
import * as schema from './schema';
config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;
console.log("DB Connection String:", connectionString);
const pool = postgres(connectionString, { max: 1 });

// logger
// const db = drizzle(pool, { logger: true })
const db = drizzle(pool, { schema });

export { db };
