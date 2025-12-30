'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboard() {
    const { language, t } = useLanguage();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/admin/stats')
            .then(res => res.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    const cards = [
        { title: 'Users', ar: 'المستخدمين', value: stats?.users || 0, color: 'var(--primary)' },
        { title: 'Exercises', ar: 'التمارين', value: stats?.exercises || 0, color: 'var(--secondary)' },
        { title: 'Meal Plans', ar: 'خطط الوجبات', value: stats?.mealPlans || 0, color: 'var(--accent)' },
        { title: 'Healthy Foods', ar: 'الأطعمة الصحية', value: stats?.foods || 0, color: '#f87171' },
        { title: 'Health Tips', ar: 'نصائح صحية', value: stats?.tips || 0, color: '#a78bfa' },
    ];

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>{language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '1.5rem'
            }}>
                {cards.map((card) => (
                    <div key={card.title} className="card glass" style={{ borderTop: `4px solid ${card.color}` }}>
                        <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            {language === 'ar' ? card.ar : card.title}
                        </p>
                        <h2 style={{ fontSize: '2rem' }}>{card.value}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
