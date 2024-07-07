import './globals.css';

import type { Metadata } from 'next';
import { Caudex } from 'next/font/google';

const caudex = Caudex({
  subsets: ['latin'],
  variable: '--font-caudex',
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Kingdoms of Vallor',
  description:
    'Em um mundo medieval repleto de conflitos, onde você é um rei de um pequeno reino, Seu objetivo é expandir suas terras no mundo de Vallor, construir um poderoso exército e dominar outros territórios, enfrentando inimigos e fazendo alianças.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={caudex.variable} lang="pt-BR">
      <body className="scroll-smooth bg-main bg-cover bg-no-repeat antialiased">
        {children}
      </body>
    </html>
  );
}
