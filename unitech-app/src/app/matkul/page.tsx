// app/matkul/page.tsx
'use client';
import { motion } from 'framer-motion';
import CourseList from '@/components/CourseList';
import React from 'react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function MatkulPage() {
  return (
    // flex-grow agar section ini mengisi ruang yang tersedia di <main>
    <motion.section variants={itemVariants} className="flex-grow flex flex-col">
      <CourseList />
    </motion.section>
  );
}
