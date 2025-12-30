'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function UserMenu() {
    const { data: session } = useSession();
    const { language, t } = useLanguage();

    if (!session) {
        return (
            <div className="auth-links">
                <Link href="/login" className="btn-primary">{t('login')}</Link>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {session.user.role === 'ADMIN' && (
                <Link href="/admin" className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', color: 'var(--primary)', border: '1px solid var(--primary)', textDecoration: 'none', borderRadius: 'var(--radius)' }}>
                    {t('admin')}
                </Link>
            )}
            <span style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>{language === 'ar' ? 'مرحباً،' : 'Hi,'} {session.user.name || 'User'}</span>
            <button onClick={() => signOut()} className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', color: 'white' }}>
                {language === 'ar' ? 'خروج' : 'Logout'}
            </button>
        </div>
    );
}
