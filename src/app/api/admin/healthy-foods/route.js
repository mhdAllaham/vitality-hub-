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
    const items = await prisma.healthyFood.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(items);
}

export async function POST(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.healthyFood.create({
        data: {
            categoryEn: body.categoryEn,
            categoryAr: body.categoryAr,
            nameEn: body.nameEn,
            nameAr: body.nameAr,
            benefitsEn: body.benefitsEn,
            benefitsAr: body.benefitsAr,
            image: body.image,
        }
    });
    revalidatePath('/healthy-foods');
    return NextResponse.json(item);
}

export async function PUT(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, ...data } = body;
    const item = await prisma.healthyFood.update({
        where: { id },
        data: {
            categoryEn: data.categoryEn,
            categoryAr: data.categoryAr,
            nameEn: data.nameEn,
            nameAr: data.nameAr,
            benefitsEn: data.benefitsEn,
            benefitsAr: data.benefitsAr,
            image: data.image,
        }
    });
    revalidatePath('/healthy-foods');
    return NextResponse.json(item);
}

export async function DELETE(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.healthyFood.delete({ where: { id } });
    revalidatePath('/healthy-foods');
    revalidatePath('/', 'layout');
    return NextResponse.json({ success: true });
}
