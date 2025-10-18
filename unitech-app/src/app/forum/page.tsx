// app/forum/page.tsx
'use client';
import { motion } from 'framer-motion';
import DiscussionForum from '@/components/DiscussionForum';
import React from 'react';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function ForumPage() {
  return (
    // flex-grow agar section ini mengisi ruang yang tersedia di <main>
    <motion.section variants={itemVariants} className="flex-grow flex flex-col">
      <DiscussionForum />
    </motion.section>
  );
}
