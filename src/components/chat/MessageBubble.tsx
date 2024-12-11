import React from 'react';

interface Message {
  role: 'user' | 'assistant';
  type: 'text' | 'code';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`max-w-md p-3 rounded-md my-2 ${isUser ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start text-left'}`}>
      {message.type === 'code' ? (
        <pre className="bg-gray-200 p-2 rounded"><code>{message.content}</code></pre>
      ) : (
        <p className="text-sm text-gray-800">{message.content}</p>
      )}
    </div>
  );
};

export default MessageBubble;
