// components/ClassStructure.tsx
import React from 'react';
import Image from 'next/image';
import { STRUKTUR_KELAS } from '@/lib/data';

export default function ClassStructure() {
  return (    
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-blue-600 h-full flex flex-col justify-center">
      <div className="space-y-4">
        {STRUKTUR_KELAS.map((anggota, index) => (
          <a
            key={index}
            href={anggota.link}
            target="_blank" // Buka di tab baru
            rel="noopener noreferrer"
            className="flex items-center p-3 bg-gray-700 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:bg-gray-600/80 group"
          >
            {/* Wrapper div untuk menjaga ukuran gambar tetap konsisten */}
            <div className="relative h-20 w-20 flex-shrink-0">
              <Image
                src={anggota.foto}
                alt={`Foto profil ${anggota.nama}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="rounded-full border-2 border-blue-500"
              />
            </div>
            <div className="ml-4">
              <p className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors">{anggota.jabatan}</p>
              <p className="text-xl font-mono text-blue-400 group-hover:text-white transition-colors">{anggota.nama}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}