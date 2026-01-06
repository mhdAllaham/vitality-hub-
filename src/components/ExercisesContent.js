'use client';

import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import { useState } from 'react';

function ExerciseCard({ exercise, language, t }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const name = language === 'ar' ? exercise.nameAr : exercise.nameEn;
    const description = language === 'ar' ? exercise.descriptionAr : exercise.descriptionEn;
    const category = language === 'ar' ? exercise.categoryAr : exercise.categoryEn;

    return (
        <div className="card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {/* Header: Always visible */}
            <div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    padding: '1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: isExpanded ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                    transition: 'background 0.3s ease'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '600', margin: 0 }}>{name}</h3>
                    <span className="glass" style={{
                        padding: '0.2rem 0.7rem',
                        fontSize: '0.7rem',
                        borderRadius: '20px',
                        color: 'var(--primary)',
                        border: '1px solid var(--primary)',
                        whiteSpace: 'nowrap'
                    }}>
                        {category}
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    color: isExpanded ? 'var(--primary)' : '#a1a1aa'
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
            </div>

            {/* Collapsible Content */}
            <div style={{
                maxHeight: isExpanded ? '800px' : '0',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isExpanded ? 1 : 0
            }}>
                <div style={{ position: 'relative', height: '250px', width: '100%', borderTop: '1px solid var(--card-border)' }}>
                    <Image
                        src={exercise.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400'}
                        alt={name}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'bottom' }}
                    />
                </div>
                <div style={{ padding: '1.5rem', background: 'rgba(0,0,0,0.2)' }}>
                    <p style={{ color: '#d1d1d6', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function ExercisesContent({ exercises }) {
    const { t, language } = useLanguage();

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{t('exercises')}</h1>
                <p style={{ color: '#a1a1aa' }}>{t('exDesc')}</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                alignItems: 'start',
                scrollBehavior: 'smooth'
            }}>
                {exercises.map((exercise) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        language={language}
                        t={t}
                    />
                ))}
            </div>
        </div>
    );
}
