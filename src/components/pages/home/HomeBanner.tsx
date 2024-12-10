import { motion } from 'framer-motion';

export const HomeBanner: React.FC = () => {
  return (
    <motion.section
      className="mx-auto px-4 py-10 text-center bg-gray-100 mt-10 rounded-md"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <h3 className="text-xl font-bold text-foreground mb-4">
        La página con la que siempre soñaste, aunque no lo sabías
      </h3>
      <p className="text-md text-gray-700">
        Grizzly, la mejor experiencia minimalista para tu IA, proyectos y máquinas. ¡Disfruta del futuro desde tu escritorio!
      </p>
    </motion.section>
  );
};