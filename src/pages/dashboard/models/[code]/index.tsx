// pages/dashboard/models/[code].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { withAuth } from '@/hoc/withAuth';

interface AIModel {
  id: string;
  name: string;
  description: string;
}

const ModelDetailPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const [model, setModel] = useState<AIModel | null>(null);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchModel = async () => {
    if (!code) return;
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`models/${code}/`);
      setModel(response.data);
    } catch (err: unknown) {
      console.error('Error al cargar el modelo:', err);
      setError('No se pudo cargar el modelo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModel();
  }, [code, fetchModel]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Detalle del Modelo</h1>
          <p className="text-gray-600 text-sm">
            Información completa sobre el modelo seleccionado.
          </p>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando modelo...</p>
      ) : model ? (
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold text-black">{model.name}</h2>
          <p className="text-gray-700">{model.description}</p>
          {/* Aquí puedes agregar más detalles si están disponibles */}
        </div>
      ) : (
        <p>No se encontró el modelo.</p>
      )}
    </motion.div>
  );
};

export default withAuth(ModelDetailPage);
