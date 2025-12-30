import { prisma } from '@/lib/prisma';
import HomeContent from '@/components/HomeContent';

async function getHealthTip() {
  const count = await prisma.healthTip.count();
  if (count === 0) return null;
  const randomIndex = Math.floor(Math.random() * count);
  const tip = await prisma.healthTip.findFirst({
    skip: randomIndex,
  });
  return tip;
}

export default async function HomePage() {
  const tip = await getHealthTip();

  return (
    <HomeContent initialTip={tip ? JSON.parse(JSON.stringify(tip)) : null} />
  );
}
