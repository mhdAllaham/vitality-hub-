'use client';

import { useLanguage } from '@/context/LanguageContext';
import HealthTipCard from '@/components/HealthTipCard';
import BMICalculator from '@/components/BMICalculator';
import Link from 'next/link';

export default function HomeContent({ initialTip }) {
    const { t } = useLanguage();

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #22c55e, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {t('welcome')}
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    {t('tagline')}
                </p>
            </section>

            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ gridColumn: 'span 2' }}>
                    <HealthTipCard initialTip={initialTip} />
                </div>

                <BMICalculator />
            </section>

            <section style={{ marginTop: '4rem' }}>
                <h2 style={{ marginBottom: '2rem' }}>{t('explore')}</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    <Link href="/exercises" className="card glass">
                        <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{t('exercises')}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{t('exDesc')}</p>
                    </Link>
                    <Link href="/meal-plans" className="card glass">
                        <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{t('mealPlans')}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{t('mpDesc')}</p>
                    </Link>
                    <Link href="/healthy-foods" className="card glass">
                        <h3 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>{t('healthyFoods')}</h3>
                        <p style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{t('hfDesc')}</p>
                    </Link>
                </div>
            </section>
        </div>
    );
}
