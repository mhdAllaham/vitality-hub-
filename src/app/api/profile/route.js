import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { weight, height, age, bmi, bmiClass } = await req.json();

        const updatedHealthData = await prisma.healthData.upsert({
            where: { userId: session.user.id },
            update: {
                weight,
                height,
                age,
                bmi,
                bmiClass,
            },
            create: {
                userId: session.user.id,
                weight,
                height,
                age,
                bmi,
                bmiClass,
            },
        });

        return NextResponse.json(updatedHealthData);
    } catch (error) {
        console.error('Profile Update Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
