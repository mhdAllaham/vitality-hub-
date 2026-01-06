import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const [userCount, exerciseCount, mealPlanCount, foodCount, tipCount] = await Promise.all([
            prisma.user.count(),
            prisma.exercise.count(),
            prisma.mealPlan.count(),
            prisma.healthyFood.count(),
            prisma.healthTip.count(),
        ]);

        return NextResponse.json({
            users: userCount,
            exercises: exerciseCount,
            mealPlans: mealPlanCount,
            foods: foodCount,
            tips: tipCount,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
    }
}
