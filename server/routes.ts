import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getChatResponse } from "./openai";
import { insertMessageSchema } from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat routes
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to get messages" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { content } = insertMessageSchema.parse({
        content: req.body.content,
        role: "user",
      });

      // Save user message
      const userMessage = await storage.addMessage({ content, role: "user" });

      // Get AI response
      const aiContent = await getChatResponse(content);

      // Save AI message
      const aiMessage = await storage.addMessage({ content: aiContent, role: "assistant" });

      res.json({ userMessage, aiMessage });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.delete("/api/messages", async (req, res) => {
    try {
      await storage.clearMessages();
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to clear messages" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
