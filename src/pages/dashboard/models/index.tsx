// pages/dashboard/models.tsx
import { useState, useEffect } from 'react';
import api from '@/services/api';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { withAuth } from '@/hoc/withAuth';

interface AIModel {
  id: string;
  name: string;
  description: string;
}

const ModelsPage: React.FC = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('models/');
      setModels(response.data);
    } catch (err: unknown) {
      console.error('Error al cargar modelos:', err);
      setError('Error al cargar modelos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Modelos</h1>
          <p className="text-gray-600 text-sm">
            Aquí puedes explorar la lista de modelos de IA disponibles y ver sus detalles.
          </p>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando modelos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {models.map(m => (
            <motion.div 
              key={m.id}
              className="bg-white border border-gray-200 rounded-md p-4 shadow-sm hover:shadow-md transition cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={`/dashboard/models/${m.id}`}>
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-black">{m.name}</h2>
                  <p className="text-sm text-gray-700">{m.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default withAuth(ModelsPage);
