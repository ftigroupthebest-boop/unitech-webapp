// components/ScheduleDetails.tsx
'use client';

import React from 'react';
import { JADWAL_MATKUL } from '@/lib/data';

// Tipe untuk properti komponen
interface ScheduleDetailsProps {
  selectedDate: Date;
}

// Fungsi helper untuk mendapatkan nama hari dan notifikasi
const getDayInfo = (date: Date) => {
  const dayIndex = date.getDay();
  const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];
  const dayName = dayNames[dayIndex];

  const schedule = JADWAL_MATKUL[dayName] || [];
  const isHoliday = ['kamis', 'jumat', 'sabtu', 'minggu'].includes(dayName) && schedule.length === 0;

  if (isHoliday) return ['Libur 🏖️'];
  if (schedule.length > 0) return schedule;
  return ['Tidak ada jadwal.'];
};

export default function ScheduleDetails({ selectedDate }: ScheduleDetailsProps) {
  const schedule = getDayInfo(selectedDate);
  const formattedDate = selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-blue-600 min-h-[200px]">
      <h3 className="text-xl font-bold text-blue-400 mb-1">Jadwal untuk:</h3>
      <p className="text-lg text-white mb-4 font-semibold">{formattedDate}</p>
      <div className="space-y-2">
        {schedule.map((item, index) => (
          <div key={index} className={`p-3 rounded-lg text-white ${item.includes('Libur') || item.includes('Tidak ada') ? 'bg-gray-700' : 'bg-blue-900 border-l-4 border-blue-500'}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}