import { prisma } from '@/lib/prisma';
import HealthTipCard from '@/components/HealthTipCard';
import Link from 'next/link';

async function getHealthTip() {
  const count = await prisma.healthTip.count();
  const randomIndex = Math.floor(Math.random() * count);
  const tip = await prisma.healthTip.findFirst({
    skip: randomIndex,
  });
  return tip;
}

export default async function HomePage() {
  const tip = await getHealthTip();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #22c55e, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Welcome to Antigravity Fit
        </h1>
        <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Your daily companion for a healthier, stronger, and more confident you.
        </p>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <HealthTipCard initialTip={JSON.parse(JSON.stringify(tip))} />
        </div>

        <div className="card glass" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Track Your Progress</h3>
          <p style={{ color: '#a1a1aa', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Calculate your BMI and set your health goals today.</p>
          <Link href="/profile" className="btn-primary" style={{ width: '100%' }}>Update Profile</Link>
        </div>
      </section>

      <section style={{ marginTop: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Explore Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <Link href="/exercises" className="card glass">
            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Exercises</h3>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Discover a wide range of workouts for every goal.</p>
          </Link>
          <Link href="/meal-plans" className="card glass">
            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>Meal Plans</h3>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Structured nutrition plans to fuel your progress.</p>
          </Link>
          <Link href="/healthy-foods" className="card glass">
            <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Healthy Foods</h3>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Learn about beneficial fruits, veggies, and herbs.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
