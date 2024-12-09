// pages/index.tsx
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col-reverse md:flex-row items-center">
          {/* Texto */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Bienvenido a Grizzly
            </h1>
            <p className="text-lg md:text-xl text-foreground mb-6">
              Tu plataforma inteligente para gestionar y almacenar conversaciones con inteligencia artificial.
            </p>
            {!isAuthenticated ? (
              <Link href="/login" className="inline-block px-6 py-3 bg-primary-white text-foreground font-semibold rounded-md shadow-md hover:bg-primary-white/80 transition">
                Iniciar Sesión
              </Link>
            ) : (
              <Link href="/dashboard" className="inline-block px-6 py-3 bg-primary-white text-foreground font-semibold rounded-md shadow-md hover:bg-primary-white/80 transition">
                Ir al Dashboard
              </Link>
            )}
          </div>
          {/* Imagen */}
        </div>
      </section>

    </div>
  );
};

export default HomePage;
