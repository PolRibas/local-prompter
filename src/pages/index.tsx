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
          <div className="md:w-1/2 mb-10 md:mb-0">
            <img
              src="/ai-conversation.svg" // Asegúrate de tener esta imagen en la carpeta public/
              alt="IA Conversación"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Características Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <img src="/secure.svg" alt="Seguridad" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">Seguridad de Nivel Empresarial</h3>
              <p className="text-gray-600 text-center">
                Tus datos están protegidos con los más altos estándares de seguridad para garantizar tu tranquilidad.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <img src="/cloud.svg" alt="Almacenamiento" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">Almacenamiento en la Nube</h3>
              <p className="text-gray-600 text-center">
                Accede y gestiona tus conversaciones desde cualquier lugar, en cualquier momento, con nuestro almacenamiento en la nube.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <img src="/analytics.svg" alt="Análisis" className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2 text-center">Análisis Avanzado</h3>
              <p className="text-gray-600 text-center">
                Obtén insights valiosos de tus conversaciones con nuestras herramientas de análisis avanzadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-white to-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            ¡Comienza Hoy Mismo!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Regístrate y descubre cómo Grizzly puede transformar la manera en que gestionas tus conversaciones con IA.
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
      </section>
    </div>
  );
};

export default HomePage;
