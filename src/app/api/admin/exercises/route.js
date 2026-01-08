import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

async function checkAdmin() {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
        return false;
    }
    return true;
}

export async function GET() {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const items = await prisma.exercise.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(items);
}

export async function POST(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.exercise.create({
        data: {
            nameEn: body.nameEn,
            nameAr: body.nameAr,
            descriptionEn: body.descriptionEn,
            descriptionAr: body.descriptionAr,
            categoryEn: body.categoryEn,
            categoryAr: body.categoryAr,
            image: body.image,
        }
    });
    revalidatePath('/exercises');
    return NextResponse.json(item);
}

export async function PUT(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, ...data } = body;
    const item = await prisma.exercise.update({
        where: { id },
        data: {
            nameEn: data.nameEn,
            nameAr: data.nameAr,
            descriptionEn: data.descriptionEn,
            descriptionAr: data.descriptionAr,
            categoryEn: data.categoryEn,
            categoryAr: data.categoryAr,
            image: data.image,
        }
    });
    revalidatePath('/exercises');
    return NextResponse.json(item);
}

export async function DELETE(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.exercise.delete({ where: { id } });
    revalidatePath('/exercises');
    revalidatePath('/');
    return NextResponse.json({ success: true });
}
