// components/Calendar.tsx
'use client'; // Gunakan Client Component karena kita akan menggunakan state dan tanggal di sisi klien
import React from 'react';
import { JADWAL_MATKUL } from '@/lib/data';

// Fungsi untuk mendapatkan nama hari dalam Bahasa Indonesia
const getNamaHari = (date: Date): string => {
  const hari = date.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
  switch (hari) {
    case 0: return 'minggu';
    case 1: return 'senin';
    case 2: return 'selasa';
    case 3: return 'rabu';
    case 4: return 'kamis';
    case 5: return 'jumat';
    case 6: return 'sabtu';
    default: return '';
  }
};

// Fungsi helper untuk mendapatkan notifikasi jadwal untuk tanggal yang dipilih
// (Dipindahkan dari ScheduleDetails.tsx)
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
// Fungsi untuk mengecek apakah ada jadwal pada hari tertentu
const hasSchedule = (date: Date): boolean => {
  const dayName = getNamaHari(date);
  const schedule = JADWAL_MATKUL[dayName] || [];
  return schedule.length > 0;
};

// Fungsi untuk mendapatkan semua hari di bulan tertentu
const getDaysInMonth = (year: number, month: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateSelect }: CalendarProps) {
  // State untuk bulan yang ditampilkan, bukan tanggal yang dipilih
  const [displayDate, setDisplayDate] = React.useState(selectedDate);
  const year = displayDate.getFullYear();
  const month = displayDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const namaBulan = displayDate.toLocaleString('id-ID', { month: 'long', year: 'numeric' });

  // Pindah bulan
  const handlePrevMonth = () => {
    setDisplayDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setDisplayDate(new Date(year, month + 1, 1));
  };

  // Data untuk detail jadwal
  const scheduleForSelectedDate = getDayInfo(selectedDate);
  const formattedSelectedDate = selectedDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl border border-blue-600 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 p-4">
        <button onClick={handlePrevMonth} className="text-blue-400 hover:text-blue-300 font-bold p-2">
          &lt; Sebelumnya
        </button>
        <h2 className="text-2xl font-bold text-blue-400 uppercase">{namaBulan}</h2>
        <button onClick={handleNextMonth} className="text-blue-400 hover:text-blue-300 font-bold p-2">
          Selanjutnya &gt;
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold mb-2 text-gray-400 px-4">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 px-4 flex-grow">
        {/* Tambahkan div kosong untuk penempatan hari pertama di kolom yang benar */}
        {Array.from({ length: daysInMonth[0].getDay() }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}

        {daysInMonth.map((date) => {
          const isToday = date.toDateString() === new Date().toDateString();
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const dayHasSchedule = hasSchedule(date);

          return (
            <div
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={`p-2 flex items-center justify-center border rounded-lg transition-all duration-300 cursor-pointer
                ${isSelected ? 'bg-blue-600 border-blue-400 shadow-md transform scale-105' : 'bg-gray-700 border-gray-600 hover:bg-gray-600'}
              `}
            >
              <div className="relative">
                <span className={`text-lg font-bold ${isToday ? 'text-white' : 'text-blue-400'}`}>
                  {date.getDate()}
                </span>
                {dayHasSchedule && !isSelected && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-400"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bagian Detail Jadwal (Digabungkan di sini) */}
      <div className="mt-6 border-t border-blue-700 p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-blue-400 mb-1">Jadwal untuk:</h3>
        <p className="text-lg text-white mb-4 font-semibold">{formattedSelectedDate}</p>
        <div className="space-y-2">
          {scheduleForSelectedDate.map((item, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg text-white ${item.includes('Libur') || item.includes('Tidak ada') ? 'bg-gray-700' : 'bg-blue-900 border-l-4 border-blue-500'}`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}