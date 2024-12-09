// hoc/withAuth.tsx
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import React from 'react';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth: React.FC = (props) => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login');
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-foreground">Cargando...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
