// src/pages/dashboard.tsx
import { useEffect, useState, useContext, FormEvent } from 'react';
import withAuth from '../hoc/withAuth';
import { AuthContext } from '../context/AuthContext';
import { fetchConversations, createConversation } from '../services/conversationService';
import { fetchAIModes } from '../services/aiModels';

interface AIModel {
    id: string;
    name: string;
    description: string;
}

interface Conversation {
  id: number;
  prompt: string;
  response: string;
  timestamp: string;
}

const Dashboard: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [aiModels, setAIModes] = useState<AIModel[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const convs = await fetchConversations();
        setConversations(convs);
      } catch (err) {
        console.error('Error al cargar las conversaciones:', err);
        setError('Error al cargar las conversaciones');
      }
    };

    const getAIModes = async () => {
      try {
        const models = await fetchAIModes();
        setAIModes(models);
      } catch (err) {
        console.error('Error al cargar los modelos de IA:', err);
        setError('Error al cargar los modelos de IA');
      }
    };

    getConversations();
    getAIModes();
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const newConv = await createConversation(prompt);
      setConversations([newConv, ...conversations]);
      setPrompt('');
    } catch (err) {
      console.error('Error al crear la conversación:', err);
      setError('Error al crear la conversación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            Cerrar Sesión
          </button>
        </div>
        <p className="text-xl text-foreground mb-4">Bienvenido, {user?.email}</p>
        
        {/* Sección para Enviar Prompt */}
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="prompt" className="block mb-2 text-foreground">
            Ingresa tu prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-white"
            placeholder="Escribe aquí..."
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary-white text-foreground rounded-md shadow-md hover:bg-primary-white/80 focus:outline-none focus:ring-2 focus:ring-primary-white"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Enviar'}
          </button>
        </form>

        {/* Sección para Listar Modelos de IA */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Modelos de Inteligencia Artificial Disponibles</h2>
          {aiModels.length === 0 ? (
            <p className="text-foreground">No hay modelos disponibles.</p>
          ) : (
            <ul className="space-y-4">
              {aiModels.map((model) => (
                <li key={model.id} className="p-4 border border-gray-200 rounded-md">
                  <h3 className="text-xl font-bold text-foreground">{model.name}</h3>
                  <p className="text-foreground">{model.description}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sección para Conversaciones Históricas */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Conversaciones Históricas</h2>
          {conversations.length === 0 ? (
            <p className="text-foreground">No hay conversaciones aún.</p>
          ) : (
            <ul className="space-y-4">
              {conversations.map((conv) => (
                <li key={conv.id} className="p-4 border border-gray-200 rounded-md">
                  <p className="text-foreground mb-2"><strong>Prompt:</strong> {conv.prompt}</p>
                  <p className="text-foreground mb-2"><strong>Respuesta:</strong> {conv.response}</p>
                  <p className="text-sm text-gray-500">{new Date(conv.timestamp).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(Dashboard);
