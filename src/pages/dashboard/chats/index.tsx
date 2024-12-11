import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '@/services/api';
import ModelSelector from '@/components/chat/ModelSelector';
import ChatHistory from '@/components/chat/ChatHistory';
import MessageInput from '@/components/chat/MessageInput';

interface Model {
  id: string;
  name: string;
  description: string;
}

interface Message {
  role: 'user' | 'assistant';
  type: 'text' | 'code';
  content: string;
}

const ChatsPage: React.FC = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchModels = async () => {
    try {
      const response = await api.get('models/');
      setModels(response.data);
      if (response.data.length > 0) {
        setSelectedModel(response.data[0].id);
      }
    } catch (err: unknown) {
      console.error('Error al cargar modelos:', err);
    }
  };

  const fetchConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('conversations/');
      // Asumiendo que response.data es un array de {prompt, response}, convertirlos a mensajes
      const convMessages: Message[] = [];
      response.data.forEach((c: any) => {
        convMessages.push({ role: 'user', type: 'text', content: c.prompt });
        convMessages.push({ role: 'assistant', type: 'text', content: c.response });
      });
      setMessages(convMessages);
    } catch (err: unknown) {
      console.error('Error al cargar la conversación:', err);
      setError('Error al cargar la conversación');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
    fetchConversations();
  }, []);

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
  };

  const handleSend = async (messageText: string) => {
    // Enviar prompt al backend con modelo seleccionado
    try {
      const response = await api.post('conversations/', { prompt: messageText, model: selectedModel });
      // Respuesta asume {prompt, response}?
      const userMsg: Message = { role: 'user', type: 'text', content: messageText };
      const assistantMsg: Message = { role: 'assistant', type: 'text', content: response.data.response };
      setMessages((prev) => [...prev, userMsg, assistantMsg]);
    } catch (err: unknown) {
      console.error('Error al enviar mensaje:', err);
      setError('Error al enviar mensaje');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Chats</h1>
          <p className="text-gray-600 text-sm">
            Conversa con el modelo de IA elegido. El historial se guarda automáticamente.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <ModelSelector 
            models={models}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando conversación...</p>
      ) : (
        <>
          <ChatHistory messages={messages} />
          <MessageInput onSend={handleSend} />
        </>
      )}
    </motion.div>
  );
};

export default ChatsPage;
