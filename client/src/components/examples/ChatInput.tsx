import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
  };

  return (
    <div className="bg-background">
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}