// pages/dashboard/settings.tsx
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import api from '@/services/api';
import { motion } from 'framer-motion';

interface UserProfile {
  id: number;
  username: string;
  email: string;
}

const SettingsPage: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('profile/');
      setProfile(response.data);
    } catch (err: unknown) {
      console.error('Error al cargar el perfil:', err);
      setError('Error al cargar el perfil.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <motion.div
      className="flex flex-col space-y-6"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Configuración</h1>
          <p className="text-gray-600 text-sm">
            Gestiona tu perfil y tus preferencias desde aquí.
          </p>
        </div>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Cargando perfil...</p>
      ) : profile ? (
        <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold">Perfil</h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Username:</span>
              <span className="text-gray-800">{profile.username}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-700">Email:</span>
              <span className="text-gray-800">{profile.email}</span>
            </div>
          </div>

          {/* Aquí podría ir un formulario para actualizar el perfil */}
          {/* Ejemplo (comentado):
          <form className="space-y-4 mt-4">
            <div>
              <label className="block font-medium mb-1" htmlFor="username">Nuevo Username</label>
              <input 
                id="username"
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Actualiza tu username"
              />
            </div>
            <div>
              <label className="block font-medium mb-1" htmlFor="email">Nuevo Email</label>
              <input 
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Actualiza tu email"
              />
            </div>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80">Guardar Cambios</button>
          </form>
          */}

          <div className="border-t border-gray-200 pt-4 flex justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      ) : (
        <p>No se pudo cargar el perfil.</p>
      )}
    </motion.div>
  );
};

export default SettingsPage;
