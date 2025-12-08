import type { Metadata } from 'next';
import './globals.css';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const fontSans = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI 航海日志 — 独立开发者的人生红点与作品集',
  description:
    '用 AI 解决特定问题，推动行业创新。这里汇总自我成长打法、AI 出海产品、AI 教育实践与代表作品。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body
        className={`${fontSans.variable} ${fontMono.variable} bg-ink text-slate-900 antialiased selection:bg-amber-200/60 selection:text-slate-900`}
      >
        <div className="min-h-screen px-4">
          <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-25" aria-hidden />
          <div className="pointer-events-none fixed inset-0 bg-glow opacity-50 blur-3xl" aria-hidden />
          <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 pb-12">
            <Navbar />
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
