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
  title: 'Neon Journal — 一个带态度的个人博客与作品集',
  description:
    'Next.js + Supabase 打造的酷炫博客作品集：精选文章、项目展示、作者介绍、MDX 互动组件与 Prisma 数据层。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hans">
      <body
        className={`${fontSans.variable} ${fontMono.variable} bg-ink text-white antialiased selection:bg-red-500/40`}
      >
        <div className="min-h-screen px-4">
          <div className="pointer-events-none fixed inset-0 bg-grid bg-[size:32px_32px] opacity-40" aria-hidden />
          <div className="pointer-events-none fixed inset-0 bg-glow opacity-60 blur-3xl" aria-hidden />
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
