import React from 'react';
import MessageBubble from './MessageBubble';

interface Message {
  role: 'user' | 'assistant';
  type: 'text' | 'code';
  content: string;
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-2 overflow-auto p-4 bg-white border border-gray-200 rounded-md h-64">
      {messages.length === 0 ? (
        <p className="text-sm text-gray-500">No hay mensajes aún. Inicia la conversación.</p>
      ) : (
        messages.map((msg, index) => <MessageBubble key={index} message={msg} />)
      )}
    </div>
  );
};

export default ChatHistory;
