import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MessageBubble from "./MessageBubble";
import MobileOptimizedInput from "./MobileOptimizedInput";
import TypingIndicator from "./TypingIndicator";
import { Button } from "@/components/ui/button";
import { type Message } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Trash2, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ThemeToggle from "./ThemeToggle";

export default function Chat() {
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch messages from API
  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages"],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      setIsTyping(true);
      const response = await apiRequest("POST", "/api/chat", { content });
      return response.json();
    },
    onSuccess: () => {
      setIsTyping(false);
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
    },
    onError: (error) => {
      setIsTyping(false);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to send message:", error);
    },
  });

  const clearChatMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("DELETE", "/api/messages");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/messages"] });
      toast({
        title: "Chat cleared",
        description: "Your conversation has been cleared.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to clear chat. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to clear chat:", error);
    },
  });

  const handleSendMessage = (content: string) => {
    if (!sendMessageMutation.isPending) {
      sendMessageMutation.mutate(content);
    }
  };

  const handleClearChat = () => {
    clearChatMutation.mutate();
  };

  return (
    <div className="flex h-screen flex-col bg-background transition-colors duration-200">
      {/* Header */}
      <header className="flex items-center justify-between border-b p-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearChat}
            disabled={clearChatMutation.isPending}
            data-testid="button-clear-chat"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        <div className="pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-muted-foreground">Loading messages...</div>
            </div>
          ) : (messages as Message[]).length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Start a conversation</h3>
                <p className="text-sm text-muted-foreground">Send a message to begin chatting with your AI assistant.</p>
              </div>
            </div>
          ) : (
            (messages as Message[]).map((message: Message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <MobileOptimizedInput
        onSendMessage={handleSendMessage}
        isLoading={sendMessageMutation.isPending}
        disabled={isTyping}
      />
    </div>
  );
}