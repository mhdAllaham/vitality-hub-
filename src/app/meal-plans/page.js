import { prisma } from '@/lib/prisma';
import MealPlansContent from '@/components/MealPlansContent';

export const dynamic = 'force-dynamic';

export default async function MealPlansPage() {
    const mealPlans = await prisma.mealPlan.findMany();

    return (
        <MealPlansContent mealPlans={JSON.parse(JSON.stringify(mealPlans))} />
    );
}
