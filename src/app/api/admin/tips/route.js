import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    return session && session.user.role === 'ADMIN';
}

export async function GET() {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = await prisma.healthTip.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(items);
}

export async function POST(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.healthTip.create({
        data: {
            contentEn: body.contentEn,
            contentAr: body.contentAr,
        }
    });
    revalidatePath('/');
    return NextResponse.json(item);
}

export async function PUT(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, contentEn, contentAr } = body;
    const item = await prisma.healthTip.update({
        where: { id },
        data: {
            contentEn,
            contentAr
        }
    });
    revalidatePath('/');
    return NextResponse.json(item);
}

export async function DELETE(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.healthTip.delete({ where: { id } });
    revalidatePath('/');
    return NextResponse.json({ success: true });
}
