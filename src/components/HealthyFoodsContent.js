'use client';

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

export default function HealthyFoodsContent({ foods }) {
    const { t, language } = useLanguage();
    const categories = ['Fruits', 'Vegetables', 'Herbs'];

    const getIcon = (cat) => {
        switch (cat) {
            case 'Fruits': return '🍎';
            case 'Vegetables': return '🥗';
            case 'Herbs': return '🌿';
            default: return '🥦';
        }
    };

    return (
        <div style={{ padding: '0 2rem 4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{
                marginBottom: '1rem',
                padding: '3rem 0',
                borderBottom: 'none',
                height: 'auto',
                position: 'static',
                background: 'transparent',
                backdropFilter: 'none',
                display: 'block'
            }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--primary)' }}>{t('healthyFoods')}</h1>
                <p style={{ color: '#a1a1aa', fontSize: '1.1rem' }}>{t('hfDesc')}</p>
            </header>

            {/* Submenu */}
            <nav style={{
                position: 'sticky',
                top: '70px',
                zIndex: 900,
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 0',
                marginBottom: '3rem',
                borderBottom: '1px solid var(--card-border)',
                display: 'flex',
                gap: '1.5rem',
                overflowX: 'auto',
                whiteSpace: 'nowrap'
            }}>
                {categories.map((cat) => (
                    <a
                        key={cat}
                        href={`#${cat.toLowerCase()}`}
                        style={{
                            padding: '0.5rem 1.2rem',
                            borderRadius: '25px',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--card-border)',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.2s ease'
                        }}
                        className="submenu-link"
                    >
                        <span>{getIcon(cat)}</span>
                        {t(cat.toLowerCase())}
                    </a>
                ))}
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                {categories.map((cat) => (
                    <section key={cat} id={cat.toLowerCase()} style={{ scrollMarginTop: '150px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem' }}>
                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                background: 'var(--card-bg)',
                                border: '1px solid var(--card-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyCenter: 'center',
                                fontSize: '1.5rem',
                                justifyContent: 'center'
                            }}>
                                {getIcon(cat)}
                            </div>
                            <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>
                                {t(cat.toLowerCase())}
                            </h2>
                            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {foods.filter(f => f.categoryEn === cat).map((food) => {
                                const name = language === 'ar' ? food.nameAr : food.nameEn;
                                const benefits = language === 'ar' ? food.benefitsAr : food.benefitsEn;

                                return (
                                    <div key={food.id} className="card glass" style={{ padding: '0', overflow: 'hidden', borderTop: `4px solid ${cat === 'Fruits' ? 'var(--accent)' : cat === 'Vegetables' ? 'var(--primary)' : 'var(--secondary)'}` }}>
                                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                            <Image
                                                src={food.image || 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=400'}
                                                alt={name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <h3 style={{ marginBottom: '1rem', fontSize: '1.3rem' }}>{name}</h3>
                                            <p style={{ color: '#d1d1d6', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                                {benefits}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>

            <style jsx>{`
                .submenu-link:hover {
                    border-color: var(--primary);
                    background: rgba(34, 197, 94, 0.1);
                    transform: translateY(-2px);
                    color: var(--primary) !important;
                }
                @media (max-width: 768px) {
                    header h1 { font-size: 2.2rem !important; }
                }
            `}</style>
        </div>
    );
}
