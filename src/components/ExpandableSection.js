'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function ExpandableSection({ title, children, color = 'var(--primary)' }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <section style={{ marginTop: '2rem', width: '100%' }}>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.2rem 1.5rem',
                    background: 'var(--card-bg)',
                    border: `1px solid var(--card-border)`,
                    borderLeft: `4px solid ${color}`,
                    borderRadius: 'var(--radius)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    textAlign: 'left',
                    color: 'white',
                    marginBottom: isExpanded ? '1.5rem' : '0'
                }}
                className="glass"
            >
                <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700' }}>{title}</h2>
                {isExpanded ? <ChevronUp size={24} color={color} /> : <ChevronDown size={24} color={color} />}
            </button>

            {isExpanded && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                    gap: '1.5rem',
                    animation: 'fadeIn 0.5s ease'
                }}>
                    {children}
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                button:hover {
                    background: rgba(255, 255, 255, 0.08);
                    transform: translateY(-2px);
                }
            `}</style>
        </section>
    );
}
