import { prisma } from '@/lib/prisma';
import ExercisesContent from '@/components/ExercisesContent';

export default async function ExercisesPage() {
    const exercises = await prisma.exercise.findMany();

    return (
        <ExercisesContent exercises={JSON.parse(JSON.stringify(exercises))} />
    );
}
