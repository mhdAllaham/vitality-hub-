import { prisma } from '@/lib/prisma';
import HealthyFoodsContent from '@/components/HealthyFoodsContent';

export default async function HealthyFoodsPage() {
    const foods = await prisma.healthyFood.findMany();

    return (
        <HealthyFoodsContent foods={JSON.parse(JSON.stringify(foods))} />
    );
}
