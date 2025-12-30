'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

export default function LanguageDirectionHandler({ children }) {
    const { language } = useLanguage();

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    return <>{children}</>;
}
