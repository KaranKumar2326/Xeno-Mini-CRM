import type { AppProps } from 'next/app';
import '../../app/globals.css'; // Import global styles// Import CustomerPage

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
