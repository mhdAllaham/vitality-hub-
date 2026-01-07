import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function HealthTipCard({ initialTip }) {
    const { t, language } = useLanguage();
    const [tip, setTip] = useState(initialTip);
    const [loading, setLoading] = useState(false);

    const refreshTip = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/health-tip');
            const data = await res.json();
            setTip(data);
        } catch (error) {
            console.error('Failed to refresh tip:', error);
        } finally {
            setLoading(false);
        }
    };

    const tipContent = language === 'ar' ? tip?.contentAr : tip?.contentEn;

    return (
        <div className="card glass" style={{ minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--primary)', padding: '1.2rem', width: '100%', boxSizing: 'border-box' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.1rem' }}>{t('healthTip')}</h3>
                </div>
                <p style={{ fontSize: 'clamp(1rem, 4.5vw, 1.1rem)', color: '#e4e4e7', lineHeight: '1.6', fontStyle: 'italic' }}>
                    &quot;{tipContent || t('noTip')}&quot;
                </p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={refreshTip}
                    disabled={loading}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        opacity: loading ? 0.5 : 1
                    }}
                >
                    {loading ? `${t('refreshTip')}...` : `${t('refreshTip')} ↻`}
                </button>
            </div>
        </div>
    );
}
