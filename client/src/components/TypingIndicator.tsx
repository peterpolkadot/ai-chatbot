import { Bot } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex gap-4 p-4" data-testid="typing-indicator">
      {/* Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Bot className="h-4 w-4" />
      </div>

      {/* Typing Animation */}
      <div className="flex max-w-xs flex-col gap-2 rounded-2xl bg-muted px-4 py-3 text-sm">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
          </div>
          <span className="text-xs text-muted-foreground/70 ml-2">AI is typing...</span>
        </div>
      </div>
    </div>
  );
}