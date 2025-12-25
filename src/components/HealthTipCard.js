'use client';

import { useState } from 'react';

export default function HealthTipCard({ initialTip }) {
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

    return (
        <div className="card glass" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--primary)' }}>
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.2rem' }}>
                    <div style={{ fontSize: '2rem', background: 'rgba(34, 197, 94, 0.1)', width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {tip?.icon || '💡'}
                    </div>
                    <h3 style={{ fontSize: '1.2rem' }}>Daily Health Tip</h3>
                </div>
                <p style={{ fontSize: '1.1rem', color: '#e4e4e7', lineHeight: '1.6', fontStyle: 'italic' }}>
                    &quot;{tip?.content || 'Loading tip...'}&quot;
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
                    {loading ? 'Refreshing...' : 'Get another tip ↻'}
                </button>
            </div>
        </div>
    );
}
