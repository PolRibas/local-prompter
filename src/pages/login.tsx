// src/pages/login.tsx
import { useState, useContext, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const { isAuthenticated, login, guestLogin } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [guestLoading, setGuestLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(username, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Credenciales inválidas. Asegúrate de que el nombre de usuario y la contraseña sean correctos.');
    }

    setLoading(false);
  };

  const handleGuestLogin = async () => {
    setError('');
    setGuestLoading(true);

    const success = await guestLogin();
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Error al iniciar sesión como invitado.');
    }

    setGuestLoading(false);
  };

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-foreground text-center">Iniciar Sesión</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 mb-0 pb-0">
          {/* Campo de Nombre de Usuario */}
          <div>
            <label htmlFor="username" className="block mb-1 text-foreground">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="tu_nombre_de_usuario"
            />
          </div>
          {/* Campo de Contraseña */}
          <div>
            <label htmlFor="password" className="block mb-1 text-foreground">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-primary-black rounded-md shadow-md hover:bg-primary-black/80 focus:outline-none focus:ring-2 focus:ring-primary-white"
            disabled={loading}
          >
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p className="text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-primary-black font-semibold hover:text-primary-black/80">
              Regístrate
          </Link>
        </p>
        <button
          onClick={handleGuestLogin}
          className="w-full px-4 py-2 font-semibold text-primary-white bg-gray-500 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-white"
          disabled={guestLoading}
        >
          {guestLoading ? 'Iniciando Sesión como Invitado...' : 'Iniciar Sesión como Invitado'}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
