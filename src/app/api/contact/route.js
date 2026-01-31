import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const inquiry = await prisma.contactInquiry.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json(inquiry, { status: 201 });
  } catch (error) {
    console.error('Error submitting contact inquiry:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
