// components/CourseList.tsx
import React from 'react';
import Image from 'next/image';
import { DAFTAR_MATKUL } from '@/lib/data';

export default function CourseList() {
  return (
    <section>
      <h2 className="text-3xl font-extrabold text-blue-400 mb-6 border-b border-gray-700 pb-4">
        Materi Mata Kuliah
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {DAFTAR_MATKUL.map((matkul) => (
          <a
            key={matkul.id}
            href={matkul.linkGdrive}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-blue-500 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative w-full aspect-square">
              <Image
                src={matkul.gambar}
                alt={`Gambar untuk ${matkul.nama}`}
                layout="fill"
                objectFit="cover"
                className="object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">{matkul.nama}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}