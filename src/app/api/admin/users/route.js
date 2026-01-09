import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    return session && session.user.role === 'ADMIN';
}

export async function GET() {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            healthData: {
                select: {
                    bmi: true,
                    bmiClass: true
                }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    const flattenedItems = items.map(item => ({
        ...item,
        bmi: item.healthData?.bmi || 'N/A',
        bmiClass: item.healthData?.bmiClass || 'N/A'
    }));

    return NextResponse.json(flattenedItems);
}

export async function PUT(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, role } = body;
    const item = await prisma.user.update({
        where: { id },
        data: { role },
        select: { id: true, name: true, email: true, role: true, healthData: true }
    });
    return NextResponse.json(item);
}

export async function DELETE(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    // Prevent deleting oneself
    const session = await getServerSession(authOptions);
    if (session.user.id === id) {
        return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
