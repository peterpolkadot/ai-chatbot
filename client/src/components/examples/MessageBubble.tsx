import MessageBubble from '../MessageBubble';

export default function MessageBubbleExample() {
  const userMessage = {
    id: "1",
    content: "Hello! How can you help me today?",
    role: "user" as const,
    timestamp: new Date(),
  };

  const aiMessage = {
    id: "2", 
    content: "Hi there! I'm an AI assistant powered by OpenAI. I can help you with a wide variety of tasks including answering questions, writing, analysis, coding help, creative projects, and much more. What would you like to work on together?",
    role: "assistant" as const,
    timestamp: new Date(),
  };

  return (
    <div className="flex flex-col space-y-2 bg-background">
      <MessageBubble message={userMessage} />
      <MessageBubble message={aiMessage} />
    </div>
  );
}