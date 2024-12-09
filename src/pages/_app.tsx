// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
// import Navbar from '../components/Navbar';
// import { Montserrat } from '@next/font/google';

// const montserrat = Montserrat({
//   subsets: ['latin'],
//   variable: '--font-montserrat',
//   weight: ['400', '500', '600', '700'],
// });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div >
        {/* <Navbar /> */}
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  );
}

export default MyApp;
