import { motion } from 'framer-motion';

export const HomeAIExplanation: React.FC = () => {
  return (
    <motion.section 
      className="max-w-4xl mx-auto px-4 py-16 text-center"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6">¿Qué es la IA y para qué sirve?</h3>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        La Inteligencia Artificial (IA) es la capacidad de las máquinas para aprender, razonar y resolver problemas. 
        Con la IA, puedes automatizar tareas complejas, analizar datos con mayor rapidez y obtener insights valiosos 
        para impulsar tus proyectos y tu negocio.
      </p>
    </motion.section>
  );
};
