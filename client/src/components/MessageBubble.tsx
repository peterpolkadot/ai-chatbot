import { cn } from "@/lib/utils";
import { type Message } from "@shared/schema";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isAI = message.role === "assistant";

  return (
    <div
      className={cn(
        "flex gap-4 p-4",
        isUser && "flex-row-reverse"
      )}
      data-testid={`message-${message.role}-${message.id}`}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "flex max-w-xs flex-col gap-2 rounded-2xl px-4 py-3 text-sm sm:max-w-md",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        
        {/* Timestamp */}
        <div
          className={cn(
            "text-xs opacity-70",
            isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}