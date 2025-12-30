'use client';

import { useLanguage } from '@/context/LanguageContext';
import ProfileForm from '@/components/ProfileForm';

export default function ProfileContent({ initialData }) {
    const { t } = useLanguage();

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{t('profile')}</h1>
                <p style={{ color: '#a1a1aa' }}>{t('tagline')}</p>
            </header>

            <div className="card glass">
                <ProfileForm initialData={initialData} />
            </div>
        </div>
    );
}
