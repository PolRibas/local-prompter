// src/components/DashboardSidebar.tsx
import Link from 'next/link';
import { useState } from 'react';
import { dashboardRoutes } from '@/config/dashboardRoutes';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

export const DashboardSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  const currentRoute = dashboardRoutes.find(route => route.path === router.pathname);

  // Separar la ruta de Settings de las demás
  const mainRoutes = dashboardRoutes.filter(route => route.name !== 'Settings');
  const settingsRoute = dashboardRoutes.find(route => route.name === 'Settings');

  return (
    <div className="relative h-full">
      {/* Barra superior (siempre visible en móvil, en escritorio se integra con el sidebar) */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white md:hidden">
        <h2 className="text-2xl font-bold text-black">Grizzly</h2>
        <button onClick={() => setIsOpen(true)} className="text-black text-2xl">
          ☰
        </button>
      </div>

      {/* Sidebar en escritorio */}
      <div className="hidden md:flex md:flex-col bg-white border-r border-gray-200 h-screen w-56">
        <div className="flex-shrink-0 flex items-center justify-center p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-black">Grizzly</h2>
        </div>
        <div className="flex-1 flex flex-col space-y-2 p-4 overflow-y-auto">
          {mainRoutes.map(route => (
            <Link key={route.name} href={route.path} className={`flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition ${currentRoute?.path === route.path ? 'bg-gray-100' : ''}`}>
              {route.icon}
              <span className="text-sm font-medium text-gray-700">{route.name}</span>
            </Link>
          ))}
        </div>
        {settingsRoute && (
          <div className="p-4 border-t border-gray-200">
            <Link key={settingsRoute.name} href={settingsRoute.path} className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition">
              {settingsRoute.icon}
              <span className="text-sm font-medium">{settingsRoute.name}</span>
            </Link>
          </div>
        )}
      </div>

      {/* Overlay móvil cuando el menú está abierto */}
      {isOpen && (
        <motion.div 
          className="md:hidden fixed inset-0 bg-white z-50 flex flex-col"
          initial={{ opacity: 0, x: '-100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '-100%' }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-black">Grizzly</h2>
            <button onClick={() => setIsOpen(false)} className="text-black text-2xl">
              ✖️
            </button>
          </div>
          <div className="flex-1 flex flex-col space-y-2 p-4 overflow-auto">
            {mainRoutes.map(route => (
              <Link key={route.name} href={route.path} className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition" onClick={() => setIsOpen(false)}>
                {route.icon}
                <span className="text-sm font-medium">{route.name}</span>
              </Link>
            ))}
          </div>
          {settingsRoute && (
            <div className="p-4 border-t border-gray-200">
              <Link key={settingsRoute.name} href={settingsRoute.path} className="flex items-center space-x-3 text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md transition" onClick={() => setIsOpen(false)}>
                {settingsRoute.icon}
                <span className="text-sm font-medium">{settingsRoute.name}</span>
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
