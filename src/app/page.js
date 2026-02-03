import { prisma } from '@/lib/prisma';
import HomeContent from '@/components/HomeContent';

export const dynamic = 'force-dynamic';

async function getHealthTip() {
  try {
    const count = await prisma.healthTip.count();
    if (count === 0) return null;
    const randomIndex = Math.floor(Math.random() * count);
    const tip = await prisma.healthTip.findFirst({
      skip: randomIndex,
    });
    return tip;
  } catch (error) {
    console.error("Error fetching health tip:", error);
    return null;
  }
}

export default async function HomePage() {
  const tip = await getHealthTip();

  return (
    <HomeContent initialTip={tip ? JSON.parse(JSON.stringify(tip)) : null} />
  );
}
