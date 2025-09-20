import OpenAI from "openai";

// Using GPT-4.1 Mini - the latest efficient model from OpenAI (April 2025)
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        {
          role: "system",
          content: "You are a helpful AI assistant. Provide clear, concise, and helpful responses to user questions. Be friendly and professional.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return response.choices[0].message.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to get AI response");
  }
}