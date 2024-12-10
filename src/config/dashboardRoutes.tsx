import { JSX } from 'react';
import { MdHome, MdSmartToy, MdChat, MdFolder, MdPeople, MdSettings } from 'react-icons/md';

interface DashboardRoute {
  name: string;
  path: string;
  icon: JSX.Element;
}

export const dashboardRoutes: DashboardRoute[] = [
  {
    name: 'Home',
    path: '/dashboard',
    icon: <MdHome size={20} />,
  },
  {
    name: 'Models',
    path: '/dashboard/models',
    icon: <MdSmartToy size={20} />,
  },
  {
    name: 'Chats',
    path: '/dashboard/chats',
    icon: <MdChat size={20} />,
  },
  {
    name: 'Projects',
    path: '/dashboard/projects',
    icon: <MdFolder size={20} />,
  },
  {
    name: 'Users',
    path: '/dashboard/users',
    icon: <MdPeople size={20} />,
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: <MdSettings size={20} />,
  },
];
