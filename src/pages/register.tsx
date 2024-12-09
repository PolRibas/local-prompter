// src/pages/register.tsx
import { useState, useContext, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import Link from 'next/link';
import api from '../services/api';

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

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      await api.post('register/', { username, email, password });
      setSuccess('Registro exitoso. Puedes iniciar sesión ahora.');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.push('/login');
    } catch (err: unknown) {
      console.error('Error en registro:', err);
      setError('Error en registro. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-foreground text-center">Registrar Cuenta</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {/* Campo de Confirmación de Contraseña */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 text-foreground">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>
        {/* Enlace para Login */}
        <p className="text-center text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" className="text-primary-black font-semibold hover:text-primary-black/80">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
