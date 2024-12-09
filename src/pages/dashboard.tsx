// pages/dashboard.tsx
import { useContext, FormEvent, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import withAuth from '../hoc/withAuth';
import { fetchConversations, createConversation } from '@/services/conversationService';

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

  useEffect(() => {
    const getConversations = async () => {
      try {
        const convs = await fetchConversations();
        setConversations(convs);
      } catch (err) {
        setError('Error al cargar las conversaciones');
      }
    };

    getConversations();
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
      setError('Error al crear la conversación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cerrar Sesión
          </button>
        </div>
        <p className="text-xl text-foreground mb-4">Bienvenido, {user?.email}</p>
        
        <form onSubmit={handleSubmit} className="mb-6">
          <label htmlFor="prompt" className="block mb-2 text-foreground">
            Ingresa tu prompt:
          </label>
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-primary-white"
            placeholder="Escribe aquí..."
            required
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-primary-white text-foreground rounded hover:bg-primary-white/80 focus:outline-none focus:ring"
            disabled={loading}
          >
            {loading ? 'Procesando...' : 'Enviar'}
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">Conversaciones Históricas</h2>
          {conversations.length === 0 ? (
            <p className="text-foreground">No hay conversaciones aún.</p>
          ) : (
            <ul className="space-y-4">
              {conversations.map((conv) => (
                <li key={conv.id} className="p-4 border border-gray-200 rounded">
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
