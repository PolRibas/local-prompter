/** @type {import('next').NextConfig} */
// import nextI18NextConfig from './next-i18next.config.js'; // Asegúrate de que sea una importación relativa con la extensión .js
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: true,
  },
  intl: {
    timeZone: 'Europe/Madrid',
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/sitemap.xml',
  //       destination: '/api/sitemap.xml',
  //     },
  //   ];
  // },
};

export default nextConfig;
