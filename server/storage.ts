import { type User, type InsertUser, type Message, type InsertMessage } from "../shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Chat functionality
  getMessages(): Promise<Message[]>;
  addMessage(message: InsertMessage): Promise<Message>;
  clearMessages(): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private messages: Message[];

  constructor() {
    this.users = new Map();
    this.messages = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getMessages(): Promise<Message[]> {
    return [...this.messages];
  }

  async addMessage(insertMessage: InsertMessage): Promise<Message> {
    const message: Message = {
      id: randomUUID(),
      ...insertMessage,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  async clearMessages(): Promise<void> {
    this.messages = [];
  }
}

// Use database storage in production, memory storage for development without DATABASE_URL
async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    const { DatabaseStorage } = await import("./database");
    return new DatabaseStorage();
  } else {
    return new MemStorage();
  }
}

// Initialize storage
let storageInstance: IStorage | null = null;
export const storage: IStorage = {
  async getUser(id: string) {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.getUser(id);
  },
  async getUserByUsername(username: string) {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.getUserByUsername(username);
  },
  async createUser(user: InsertUser) {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.createUser(user);
  },
  async getMessages() {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.getMessages();
  },
  async addMessage(message: InsertMessage) {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.addMessage(message);
  },
  async clearMessages() {
    if (!storageInstance) storageInstance = await createStorage();
    return storageInstance.clearMessages();
  }
};
