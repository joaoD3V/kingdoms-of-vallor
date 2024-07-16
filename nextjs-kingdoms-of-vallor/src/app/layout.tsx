import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Kingdoms of Vallor',
    default: 'Kingdoms of Vallor',
  },
  description:
    'Em um mundo medieval repleto de conflitos, onde você é um rei de um pequeno reino, seu objetivo é expandir suas terras no mundo de Vallor, construir um poderoso exército e dominar outros territórios, enfrentando inimigos e fazendo alianças.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={inter.variable} lang="pt-BR">
      <body className="scroll-smooth antialiased">{children}</body>
    </html>
  );
}
