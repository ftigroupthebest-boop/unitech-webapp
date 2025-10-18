// components/DiscussionForum.tsx
'use client';

import React, { useState, useEffect } from 'react';

// Tipe data untuk balasan
type Reply = {
  _id: string; // MongoDB ID
  user: string;
  text: string;
  createdAt: string; // Ditambahkan
};

// Tipe data untuk pesan utama, sekarang bisa berisi balasan
type Message = {
  _id: string; // MongoDB ID
  user: string;
  text: string;
  createdAt: string; // Ditambahkan
  replies: Reply[];
};

export default function DiscussionForum() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('Anonim');
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // ID pesan yang sedang dibalas
  const [replyText, setReplyText] = useState('');

  // Muat pesan dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/forum');
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Gagal memuat pesan');
        }
        setMessages(data);
        setError(null);
      } catch (err: unknown) {
        console.error(err);
        // Set pesan error untuk ditampilkan di UI
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat pesan.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    try {
      const response = await fetch('/api/forum', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userName || 'Anonim', text: newMessage }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim pesan');
      }
      const newMsg = data;
      setMessages((prev) => [newMsg, ...prev]);
      setNewMessage('');
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Gagal mengirim pesan. Silakan coba lagi.');
    }
  };

  const handleReplySubmit = async (e: React.FormEvent, parentId: string) => {
    e.preventDefault();
    if (replyText.trim() === '') return;

    try {
      const response = await fetch(`/api/forum/${parentId}/replies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userName || 'Anonim', text: replyText }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim balasan');
      }
      const updatedMessage = data;

      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg._id === parentId ? updatedMessage : msg
        )
      );
      setReplyText('');
      setReplyingTo(null);
    } catch (err: unknown) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Gagal mengirim balasan. Silakan coba lagi.');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-2xl border border-blue-600 flex-grow flex flex-col">
      <h3 className="text-2xl font-semibold mb-4 text-blue-400 border-b pb-2 border-blue-700">Forum Diskusi</h3>

      {/* Bagian Input */}
      <form onSubmit={handleSubmit} className="mb-4 p-3 bg-gray-900 rounded-lg">
        <input
          type="text"
          placeholder="Nama Anda"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-700 border border-blue-600 rounded text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
        />
        <textarea
          placeholder="Tulis pesan Anda di sini..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          rows={3}
          className="w-full p-2 mb-2 bg-gray-700 border border-blue-600 rounded text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Kirim Pesan
        </button>
      </form>

      {/* Bagian Pesan (Scrollable) */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        {loading ? (
          <p className="text-center text-gray-400">Memuat pesan...</p>
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="p-4 bg-gray-700 rounded-lg shadow-md border-l-4 border-blue-500 transition-colors duration-200 hover:bg-gray-600/50">
              <div className="flex justify-between items-center mb-1">
                <p className="font-bold text-blue-300">{msg.user}</p>
                <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-white whitespace-pre-wrap">{msg.text}</p>
              
              {/* Tombol Balas */}
              <div className="mt-3">
                <button onClick={() => setReplyingTo(replyingTo === msg._id ? null : msg._id)} className="text-xs text-blue-400 hover:underline">
                  {replyingTo === msg._id ? 'Batal Balas' : `Balas (${msg.replies.length})`}
                </button>
              </div>

              {/* Area Balasan */}
              <div className="pl-6 mt-4 space-y-4 border-l-2 border-gray-600">
                {msg.replies.map(reply => (
                  <div key={reply._id} className="p-3 bg-gray-800 rounded-md">
                    <div className="flex justify-between items-center mb-1">
                      <p className="font-bold text-sm text-blue-300">{reply.user}</p>
                      <span className="text-xs text-gray-500">{new Date(reply.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-white whitespace-pre-wrap">{reply.text}</p>
                  </div>
                ))}
              </div>

              {/* Form untuk Membalas */}
              {replyingTo === msg._id && (
                <form onSubmit={(e) => handleReplySubmit(e, msg._id)} className="mt-4 pl-6 border-l-2 border-gray-600">
                  <textarea
                    placeholder={`Balas kepada ${msg.user}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={2}
                    className="w-full p-2 mb-2 bg-gray-800 border border-blue-700 rounded text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                  <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-1 px-3 rounded text-sm transition-colors duration-200">
                    Kirim Balasan
                  </button>
                </form>
              )}
            </div>
          ))
        )}
        {!loading && !error && messages.length === 0 && <p className="text-center text-gray-400 mt-10">Belum ada pesan.</p>}
      </div>

      {/* Gaya kustom untuk scrollbar (opsional, tambahkan di globals.css) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151; /* gray-700 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2563eb; /* blue-600 */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8; /* blue-700 */
        }
      `}</style>
    </div>
  );
}