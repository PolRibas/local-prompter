import { useState, useContext, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import api from '@/services/api';
import { motion } from 'framer-motion';

const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      await api.post('register/', { username, email, password });
      setSuccess('Registro exitoso. Redirigiendo a login...');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => router.push('/login'), 1500);
    } catch (err: unknown) {
      console.error('Error en registro:', err);
      setError('Error en registro. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-foreground text-center">Registrar Cuenta</h1>
        <p className="text-center text-gray-600 mb-4">Crea tu cuenta y comienza a disfrutar</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
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
            <label htmlFor="email" className="block mb-1 text-foreground font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="usuario@example.com"
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
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-foreground font-medium">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-black rounded-md shadow-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        <p className="text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-black font-semibold hover:opacity-80">
            Inicia Sesión
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
