import { prisma } from '@/lib/prisma';
import MealPlansContent from '@/components/MealPlansContent';

export default async function MealPlansPage() {
    const mealPlans = await prisma.mealPlan.findMany();

    return (
        <MealPlansContent mealPlans={JSON.parse(JSON.stringify(mealPlans))} />
    );
}
