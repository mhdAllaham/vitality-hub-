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
    const items = await prisma.mealPlan.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(items);
}

export async function POST(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const item = await prisma.mealPlan.create({
        data: {
            type: body.type,
            nameEn: body.nameEn,
            nameAr: body.nameAr,
            descriptionEn: body.descriptionEn,
            descriptionAr: body.descriptionAr,
            image: body.image,
        }
    });
    revalidatePath('/meal-plans');
    return NextResponse.json(item);
}

export async function PUT(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    const { id, ...data } = body;
    const item = await prisma.mealPlan.update({
        where: { id },
        data: {
            type: data.type,
            nameEn: data.nameEn,
            nameAr: data.nameAr,
            descriptionEn: data.descriptionEn,
            descriptionAr: data.descriptionAr,
            image: data.image,
        }
    });
    revalidatePath('/meal-plans');
    return NextResponse.json(item);
}

export async function DELETE(req) {
    if (!await checkAdmin()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await prisma.mealPlan.delete({ where: { id } });
    revalidatePath('/meal-plans');
    return NextResponse.json({ success: true });
}
