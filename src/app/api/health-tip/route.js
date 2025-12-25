import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const count = await prisma.healthTip.count();
        if (count === 0) return NextResponse.json({ error: 'No tips found' }, { status: 404 });

        const randomIndex = Math.floor(Math.random() * count);
        const tip = await prisma.healthTip.findFirst({
            skip: randomIndex,
        });

        return NextResponse.json(tip);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
