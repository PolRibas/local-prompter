import { motion } from 'framer-motion';

export const HomeResponsibility: React.FC = () => {
  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 py-10 text-center"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6">Responsabilidad y Almacenamiento Local</h3>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Esta aplicación se ejecuta en un ordenador local, y todas las conversaciones y datos se almacenan de forma local en su disco. Así, tu información permanece en el control de la casa y no se envía a terceros.
      </p>
    </motion.section>
  );
};
