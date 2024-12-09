// pages/login.tsx
import { useState, useContext, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const { isAuthenticated, login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Credenciales inválidas');
    }

    setLoading(false);
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Email */}
          <div>
            <label htmlFor="email" className="block mb-1 text-foreground">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@example.com"
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
            className="w-full px-4 py-2 font-semibold text-white bg-primary-white rounded-md shadow hover:bg-primary-white/80 focus:outline-none focus:ring-2 focus:ring-primary-white"
            disabled={loading}
          >
            {loading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        {/* Enlace para Registro */}
        <p className="text-center text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link href="/register" className="text-primary-white font-semibold hover:text-primary-white/80">
              Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
