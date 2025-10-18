// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Unitech WebApp', // Judul baru untuk tab browser
  description: 'Kalender Matkul, Forum, dan Struktur Kelas.',
  // Mendefinisikan ikon dengan lebih spesifik untuk kompatibilitas browser
  icons: {
    icon: [
      { url: '/images/logo.png' }, // Pastikan file ini ada
      new URL('/images/logo.png', 'http://localhost:3000'), // Path absolut untuk development
    ],
    shortcut: ['/images/logo.png'],
    apple: [{ url: '/images/logo.png', sizes: '180x180' }],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      {/* Menggunakan flexbox untuk membuat layout full-height */}
      <body className={`${inter.className} bg-gray-900 text-white min-h-screen flex flex-col`}>
        <header className="sticky top-0 z-50 w-full bg-gray-900/50 backdrop-blur-lg border-b border-white/10 shadow-lg">
          <div className="container mx-auto flex justify-between items-center px-4 py-2">
            <Link href="/" className="transition-transform duration-300 hover:scale-105">
              <Image
                src="/images/logo.png" // Ganti dengan path logo Anda
                alt="UniTech Logo"
                width={140} // Mengembalikan lebar logo ke ukuran yang lebih pas
                height={35}  // Mengembalikan tinggi logo ke ukuran yang lebih pas
                priority={true} // Prioritaskan pemuatan logo
              />
            </Link>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="relative text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 text-sm font-medium group">
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
              <Link href="/matkul" className="relative text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 text-sm font-medium group">
                Matkul
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
              <Link href="/forum" className="relative text-white hover:text-blue-300 transition-colors duration-200 px-3 py-2 text-sm font-medium group">
                Forum
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            </nav>
          </div>
        </header>
        {/* flex-grow akan membuat main mengisi sisa ruang vertikal */}
        <main className="container mx-auto p-6 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}