import { useEffect, useState } from 'react';
import { fetchAIModes } from '@/services/aiModels';
import { motion } from 'framer-motion';

interface AIMode {
  id: number;
  name: string;
  description?: string;
}

export const HomeModels: React.FC = () => {
  const [aiModes, setAIModes] = useState<AIMode[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAIModes = async () => {
      try {
        const models = await fetchAIModes();
        setAIModes(models);
      } catch (err) {
        console.error('Error al cargar los modelos de IA:', err);
        setError('Error al cargar los modelos de IA');
      }
    };
    getAIModes();
  }, []);

  if (error) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center text-red-600">
        {error}
      </section>
    );
  }

  if (aiModes.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-10 text-center text-gray-500">
        Cargando modelos de IA...
      </section>
    );
  }

  return (
    <motion.section 
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6">Modelos de IA Disponibles</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {aiModes.map(mode => (
          <div key={mode.id} className="border border-gray-200 p-4 rounded-md hover:shadow-sm transition text-center">
            <h4 className="text-lg font-semibold text-foreground mb-2">{mode.name}</h4>
            <p className="text-sm text-gray-600">{mode.description || 'Sin descripción'}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
