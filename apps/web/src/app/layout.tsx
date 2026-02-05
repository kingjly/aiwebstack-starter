import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@repo/ui/styles';
import './globals.css';
import { TrpcProvider } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIWebStack App',
  description: 'Built with Next.js 15 + Base UI + tRPC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
