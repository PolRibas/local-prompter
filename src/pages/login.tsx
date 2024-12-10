import { useState, useContext, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
      setError('Credenciales inválidas. Revisa tu usuario y contraseña.');
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

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-foreground text-center">Iniciar Sesión</h1>
        <p className="text-center text-gray-600 mb-4">Accede a tu cuenta para continuar</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 text-foreground font-medium">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="tu_nombre_de_usuario"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-foreground font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md shadow-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black"
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <div className="text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-black font-semibold hover:opacity-80">
            Regístrate
          </Link>
        </div>
        <button
          onClick={handleGuestLogin}
          className="w-full px-4 py-2 font-semibold text-white bg-gray-700 rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
          disabled={guestLoading}
        >
          {guestLoading ? 'Cargando Invitado...' : 'Entrar como Invitado'}
        </button>
      </motion.div>
    </div>
  );
};

export default LoginPage;
