// app/api/forum/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Message from '@/models/Message';

// GET all messages
export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .populate('replies'); // Tambahkan baris ini

    return NextResponse.json(messages, { status: 200 });
  } catch (error: unknown) {
    console.error('API GET Error:', error);
    if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
      return NextResponse.json({ error: 'Koneksi ke database gagal. Pastikan IP Anda sudah di-whitelist di MongoDB Atlas.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Terjadi kesalahan pada server.' }, { status: 500 });
  }
}

// POST a new message
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { user, text } = body;
    if (!user || !text) {
      return NextResponse.json({ error: 'User and text are required' }, { status: 400 });
    }
    const newMessage = await Message.create({ user, text, replies: [] });
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error: unknown) {
    console.error('API POST Error:', error);
    if (error instanceof Error && error.name === 'MongooseServerSelectionError') {
      return NextResponse.json({ error: 'Koneksi ke database gagal. Pastikan IP Anda sudah di-whitelist di MongoDB Atlas.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Gagal menyimpan pesan ke database.' }, { status: 500 });
  }
}
