import { useContext, useEffect, useState, FormEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';
import api from '@/services/api';
import { motion } from 'framer-motion';
import { withAuth } from '@/hoc/withAuth';

interface User {
  id: number;
  username: string;
  email: string;
}

const UsersPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const isGrizzly = user?.username === 'grizzly';

  const fetchUsers = async (search: string = '') => {
    try {
      setLoading(true);
      setError(null);
      let url = 'users/';
      if (search) {
        url += `?search=${encodeURIComponent(search)}`;
      }
      const response = await api.get(url);
      setUsers(response.data);
    } catch (err: unknown) {
      console.error('Error al cargar usuarios:', err);
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number, username: string) => {
    if (!isGrizzly || username === 'grizzly') return;
    try {
      await api.delete(`users/${id}/`);
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (err: unknown) {
      console.error('Error al borrar usuario:', err);
      setError('Error al borrar el usuario');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    fetchUsers(searchTerm);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="md:flex md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Usuarios</h1>
          <p className="text-gray-600 text-sm">
            Aquí puedes visualizar y gestionar la lista de usuarios.
          </p>
        </div>
        <form onSubmit={handleSearch} className="mt-4 md:mt-0 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Buscar por username o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-black/80 transition"
          >
            Buscar
          </button>
        </form>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm border border-gray-200 rounded-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Username</th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Email</th>
                {isGrizzly && <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acciones</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="px-4 py-2 text-sm text-gray-700">{u.id}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{u.username}</td>
                  <td className="px-4 py-2 text-sm text-gray-700">{u.email}</td>
                  {isGrizzly && (
                    <td className="px-4 py-2 text-sm">
                      {u.username !== 'grizzly' && (
                        <button
                          onClick={() => deleteUser(u.id, u.username)}
                          className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Borrar
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default withAuth(UsersPage);
