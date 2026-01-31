import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const messages = await prisma.contactInquiry.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching messages' }, { status: 500 });
    }
}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id, status } = await request.json();
        const updatedMessage = await prisma.contactInquiry.update({
            where: { id },
            data: { status },
        });
        return NextResponse.json(updatedMessage);
    } catch (error) {
        return NextResponse.json({ error: 'Error updating message' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        await prisma.contactInquiry.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Error deleting message' }, { status: 500 });
    }
}
