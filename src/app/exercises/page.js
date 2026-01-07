import { prisma } from '@/lib/prisma';
import ExercisesContent from '@/components/ExercisesContent';

export const dynamic = 'force-dynamic';

export default async function ExercisesPage() {
    const exercises = await prisma.exercise.findMany();

    return (
        <ExercisesContent exercises={JSON.parse(JSON.stringify(exercises))} />
    );
}
