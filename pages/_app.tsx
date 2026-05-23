/**
 * _app.tsx
 * ========
 * Root Next.js app wrapper for Cheers Magazine.
 * Initializes global state, fonts, and providers.
 */

import type { AppProps } from 'next/app';
import Head from 'next/head';
import '@/styles/globals.css';

export default function CheersApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#0A0A0A" />
        <title>Cheers Magazine</title>
        <meta name="description" content="Cheers Magazine — Premium Digital Edition" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="noise-overlay">
        <Component {...pageProps} />
      </div>
    </>
  );
}
