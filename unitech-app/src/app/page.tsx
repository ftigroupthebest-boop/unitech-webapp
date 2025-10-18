// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Calendar from '@/components/Calendar';
import ClassStructure from '@/components/ClassStructure';

// Varian untuk setiap item yang akan dianimasikan
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    // flex-grow agar div ini mengisi ruang yang tersedia di <main>
    <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Kolom Kiri: Kalender, dibungkus dengan motion.section */}
      <motion.section variants={itemVariants} className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">Kalender & Jadwal</h2>
        <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
      </motion.section>
      {/* Kolom Kanan: Struktur Kelas, dibungkus dengan motion.section */}
      <motion.section variants={itemVariants} className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-white">Struktur Kelas</h2>
        <ClassStructure />
      </motion.section>
    </div>
  );
}