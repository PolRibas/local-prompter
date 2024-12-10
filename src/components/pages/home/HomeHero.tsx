import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const HomeHero: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <motion.section 
      className="bg-gradient-to-r from-primary-white to-gray-100 py-20" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Grizzly Home
          </h2>
          <p className="text-lg text-foreground mb-6">
            Accede a tus máquinas, administra proyectos y mantén tus chats de IA organizados.
            Todo con un diseño minimalista y performance optimizada.
          </p>
          {!isAuthenticated ? (
            <Link 
              href="/login" 
              className="inline-block px-6 py-3 bg-primary-white text-foreground font-semibold rounded-md shadow-md hover:bg-gray-200 transition"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <Link 
              href="/dashboard" 
              className="inline-block px-6 py-3 bg-primary-white text-foreground font-semibold rounded-md shadow-md hover:bg-gray-200 transition"
            >
              Ir al Dashboard
            </Link>
          )}
        </div>
        {/* Aquí podrías agregar una imagen o ilustración minimalista */}
        <div className="md:w-1/2">
          {/* Imagen opcional, un div gris o un svg minimal */}
          {/* <div className="w-full h-64 bg-gray-200 rounded-md"></div> */}
          <Image 
            src="/grizzly-machine.jpg" 
            alt="Grizzly Home" 
            width={500} 
            height={300} 
            layout="responsive"
            className="w-full h-64 bg-gray-200 rounded-xl"
          />
        </div>
      </div>
    </motion.section>
  );
};
