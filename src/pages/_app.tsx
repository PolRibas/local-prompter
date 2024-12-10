// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { Montserrat } from 'next/font/google';
import { useRouter } from 'next/router';
import { DashboardLayout } from '@/components';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700'],
});

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isDashboard = router.pathname.startsWith('/dashboard');
  return (
    <AuthProvider>
      <div className={montserrat.variable}>
        {isDashboard ? (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </AuthProvider>
  );
}

export default MyApp;
