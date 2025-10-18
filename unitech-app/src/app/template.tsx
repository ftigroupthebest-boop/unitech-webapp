// src/app/template.tsx
'use client';

import { motion } from 'framer-motion';

// Definisikan varian animasi untuk container dan item
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Jeda 0.2 detik antara animasi setiap anak
    },
  },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      // Menambahkan kelas ini penting agar layout tetap full-height
      className="flex-grow flex flex-col"
    >
      {children}
    </motion.div>
  );
}
