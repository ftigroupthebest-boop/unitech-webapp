// lib/data.ts

export type JadwalHarian = {
  [hari: string]: string[];
};

export const JADWAL_MATKUL: JadwalHarian = {
  senin: ['Algoritma', 'Kalkulus 1', 'Pengantar Teknologi Informasi'],
  selasa: ['Bahasa Inggris', 'Aljabar Linier', 'Bahasa Indonesia'],
  rabu: ['Sistem Operasi'],
};

export const STRUKTUR_KELAS = [
  {
    jabatan: 'Ketua Kelas',
    nama: 'Rindra Bagus Haryo Putranto',
    foto: '/images/Gemini_Generated_Image_l8wlxyl8wlxyl8wl.png',
    link: 'https://rindra-portfolio.netlify.app' // Tautan untuk Ketua Kelas
  },
  {
    jabatan: 'Wakil Ketua 1',
    nama: 'Adrian Yoga Pratama',
    foto: '/images/Gemini_Generated_Image_xt0x8cxt0x8cxt0x.png',
    link: 'http://adrianfolio.netlify.app' // Tautan untuk Wakil Ketua 1
  },
  {
    jabatan: 'Wakil Ketua 2',
    nama: 'Hernata Ramadhan',
    foto: '/images/Gemini_Generated_Image_y04cuuy04cuuy04c.png',
    link: 'https://hernataportfolio.netlify.app/' // Tautan untuk Wakil Ketua 2
  }
];

// Data untuk daftar mata kuliah dengan link G-Drive
export const DAFTAR_MATKUL = [
  {
    id: 1,
    nama: 'Dasar Algoritma & Pemrograman',
    gambar: '/images/IMG-20251017-WA0005.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_1',
  },
  {
    id: 2,
    nama: 'Kalkulus 1',
    gambar: '/images/IMG-20251017-WA0006.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_2',
  },
  {
    id: 3,
    nama: 'Pengantar Teknologi Informasi',
    gambar: '/images/IMG-20251017-WA0008.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_3',
  },
  {
    id: 5,
    nama: 'Bahasa Inggris',
    gambar: '/images/IMG-20251017-WA0011.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_5',
  },
  {
    id: 6,
    nama: 'Aljabar Linier',
    gambar: '/images/IMG-20251017-WA0012.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_6',
  },
  {
    id: 7,
    nama: 'Bahasa Indonesia',
    gambar: '/images/IMG-20251017-WA0009.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_7',
  },
  {
    id: 8,
    nama: 'Sistem Operasi',
    gambar: '/images/IMG-20251017-WA0013.jpg',
    linkGdrive: 'https://drive.google.com/drive/folders/1a_placeholder_link_8',
  },
];
