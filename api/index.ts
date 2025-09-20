import type { VercelRequest, VercelResponse } from '@vercel/node';
import { type Message, type InsertMessage } from "../shared/schema";
import { randomUUID } from "crypto";

// Simple in-memory storage for serverless
let messages: Message[] = [];

// Simplified serverless handler
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;
  
  try {
    if (url?.includes('/api/messages') && method === 'GET') {
      return res.status(200).json(messages);
    }
    
    if (url?.includes('/api/messages') && method === 'DELETE') {
      messages = [];
      return res.status(200).json({ success: true });
    }
    
    if (url?.includes('/api/chat') && method === 'POST') {
      const { content } = req.body;
      
      if (!content) {
        return res.status(400).json({ error: 'Content is required' });
      }
      
      // Add user message
      const userMessage: Message = {
        id: randomUUID(),
        content,
        role: 'user',
        timestamp: new Date()
      };
      messages.push(userMessage);
      
      // Simple AI response
      const aiContent = `You said: "${content}". This is a demo response from your AI chatbot!`;
      
      const aiMessage: Message = {
        id: randomUUID(),
        content: aiContent,
        role: 'assistant', 
        timestamp: new Date()
      };
      messages.push(aiMessage);
      
      return res.status(200).json({ userMessage, aiMessage });
    }
    
    res.status(404).json({ error: 'Not found' });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}