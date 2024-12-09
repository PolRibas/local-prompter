// src/components/Navbar.tsx
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-primary-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-foreground">
              Grizzly
            </Link>
          </div>
          {/* Enlaces de Navegación */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-foreground hover:border-primary-white">
              Inicio
            </Link>
            {isAuthenticated && (
              <Link href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-foreground hover:border-primary-white">
                Dashboard
              </Link>
            )}
          </div>
          {/* Botón de Autenticación */}
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link href="/login" className="px-4 py-2 bg-primary-white text-foreground rounded-md hover:bg-primary-white/80 transition">
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Menú Móvil (Opcional) */}
      {/* Puedes agregar un menú desplegable para dispositivos móviles si lo deseas */}
    </nav>
  );
};

export default Navbar;
