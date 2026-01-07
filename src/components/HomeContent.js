'use client';

import { useLanguage } from '@/context/LanguageContext';
import HealthTipCard from '@/components/HealthTipCard';
import BMICalculator from '@/components/BMICalculator';
import Link from 'next/link';

export default function HomeContent({ initialTip }) {
    const { t } = useLanguage();

    return (
        <div style={{ padding: '1rem', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            <section style={{ marginBottom: '2.5rem', textAlign: 'center', paddingTop: '1rem' }}>
                <h1 style={{
                    fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                    fontWeight: '800',
                    marginBottom: '1rem',
                    background: 'linear-gradient(to right, #22c55e, #0ea5e9)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    lineHeight: '1.1',
                    padding: '0 0.5rem'
                }}>
                    {t('welcome')}
                </h1>
                <p style={{ color: '#a1a1aa', fontSize: 'clamp(0.9rem, 4vw, 1.2rem)', maxWidth: '600px', margin: '0 auto', padding: '0 1rem' }}>
                    {t('tagline')}
                </p>
            </section>

            <section style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1.5rem',
            }}>
                <div style={{ width: '100%' }}>
                    <HealthTipCard initialTip={initialTip} />
                </div>

                <div style={{ width: '100%' }}>
                    <BMICalculator />
                </div>
            </section>

            <style jsx>{`
                @media (min-width: 1024px) {
                    section:nth-of-type(2) {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            `}</style>

            <section style={{ marginTop: '3rem' }}>
                <h2 style={{ marginBottom: '1.5rem', padding: '0 0.5rem' }}>{t('explore')}</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                    gap: '1.2rem'
                }}>
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
