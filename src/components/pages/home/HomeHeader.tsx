import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export const HomeHeader: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-white">
      <h1 className="text-2xl font-bold text-foreground">Grizzly</h1>
      <nav className="flex items-center space-x-6 text-foreground">
        {!isAuthenticated ? (
          <>
            <Link href="/login" className="hover:text-gray-600 transition">Login</Link>
            <Link href="/register" className="hover:text-gray-600 transition">Sign Up</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
            <button onClick={logout} className="hover:text-gray-600 transition">
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};
