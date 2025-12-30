'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function MealPlansContent({ mealPlans }) {
    const { t, language } = useLanguage();
    const categories = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{t('mealPlans')}</h1>
                <p style={{ color: '#a1a1aa' }}>{t('mpDesc')}</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {categories.map((cat) => (
                    <div key={cat}>
                        <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem' }}>
                            {language === 'ar' ? (cat === 'Breakfast' ? 'الإفطار' : cat === 'Lunch' ? 'الغداء' : 'العشاء') : cat}
                        </h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '2rem'
                        }}>
                            {mealPlans.filter(p => p.type === cat).map((plan) => {
                                const name = language === 'ar' ? plan.nameAr : plan.nameEn;
                                const description = language === 'ar' ? plan.descriptionAr : plan.descriptionEn;

                                return (
                                    <div key={plan.id} className="card glass">
                                        <h3 style={{ marginBottom: '0.8rem', color: 'var(--secondary)' }}>{name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#d1d1d6', lineHeight: '1.6' }}>
                                            {description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
