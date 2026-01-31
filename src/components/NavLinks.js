'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function NavLinks() {
    const { t } = useLanguage();

    return (
        <ul>
            <li><Link href="/">{t('home')}</Link></li>
            <li><Link href="/exercises">{t('exercises')}</Link></li>
            <li><Link href="/meal-plans">{t('mealPlans')}</Link></li>
            <li><Link href="/healthy-foods">{t('healthyFoods')}</Link></li>
            <li><Link href="/contact">{t('contact')}</Link></li>
            <li><Link href="/profile">{t('profile')}</Link></li>
        </ul>
    );
}
