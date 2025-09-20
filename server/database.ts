import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { messages, users } from "../shared/schema";

// Check for DATABASE_URL when actually using the database

// Initialize database connection
function initializeDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  const sql = neon(process.env.DATABASE_URL);
  return drizzle(sql, { schema: { messages, users } });
}

export const db = initializeDb();

// Database storage implementation
import { type User, type InsertUser, type Message, type InsertMessage } from "../shared/schema";

export class DatabaseStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getMessages(): Promise<Message[]> {
    return await db.select().from(messages).orderBy(messages.timestamp);
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(insertMessage).returning();
    return result[0];
  }

  async clearMessages(): Promise<void> {
    await db.delete(messages);
  }
}