import type { Metadata } from 'next';
import { Manrope, Syne } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/Nav';
import { PlayerBar } from '@/components/PlayerBar';
import { ShootingStarsCanvas } from '@/components/ShootingStarsCanvas';
import { PlayerProvider } from '@/providers/PlayerProvider';

const headingFont = Syne({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700']
});

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600']
});

export const metadata: Metadata = {
  title: 'zidan kazi',
  description: 'personal portfolio of zidan kazi',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="bg-ink-950 font-body text-ink-100">
        <PlayerProvider>
          <ShootingStarsCanvas />
          <div className="grain-overlay" />
          <div className="relative z-10 min-h-screen px-6 pb-32">
            <div className="mx-auto w-full max-w-6xl">
              <Nav />
              {children}
            </div>
          </div>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
