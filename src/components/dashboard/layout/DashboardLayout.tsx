import { DashboardSidebar } from './DashboardSidebar';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="md:h-screen md:flex bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

