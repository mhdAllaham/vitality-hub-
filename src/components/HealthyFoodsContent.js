'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function HealthyFoodsContent({ foods }) {
    const { t, language } = useLanguage();
    const categories = ['Fruits', 'Vegetables', 'Herbs'];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{t('healthyFoods')}</h1>
                <p style={{ color: '#a1a1aa' }}>{t('hfDesc')}</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {categories.map((cat) => (
                    <div key={cat}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>
                                {language === 'ar' ? (cat === 'Fruits' ? 'الفواكه' : cat === 'Vegetables' ? 'الخضروات' : 'الأعشاب') : cat}
                            </h2>
                            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {foods.filter(f => f.categoryEn === cat).map((food) => {
                                const name = language === 'ar' ? food.nameAr : food.nameEn;
                                const benefits = language === 'ar' ? food.benefitsAr : food.benefitsEn;

                                return (
                                    <div key={food.id} className="card glass" style={{ borderTop: `4px solid ${cat === 'Fruits' ? 'var(--accent)' : cat === 'Vegetables' ? 'var(--primary)' : 'var(--secondary)'}` }}>
                                        <h3 style={{ marginBottom: '0.8rem' }}>{name}</h3>
                                        <p style={{ fontSize: '0.9rem', color: '#d1d1d6', lineHeight: '1.6' }}>
                                            {benefits}
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
