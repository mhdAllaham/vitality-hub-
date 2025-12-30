'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminSidebar() {
    const pathname = usePathname();
    const { language } = useLanguage();
    const isRtl = language === 'ar';

    const menuItems = [
        { name: 'Dashboard', ar: 'لوحة التحكم', href: '/admin' },
        { name: 'Users', ar: 'المستخدمين', href: '/admin/users' },
        { name: 'Exercises', ar: 'التمارين', href: '/admin/exercises' },
        { name: 'Meal Plans', ar: 'خطط الوجبات', href: '/admin/meal-plans' },
        { name: 'Healthy Foods', ar: 'الأطعمة الصحية', href: '/admin/healthy-foods' },
        { name: 'Health Tips', ar: 'نصائح صحية', href: '/admin/tips' },
    ];

    return (
        <aside style={{
            width: '260px',
            background: 'var(--glass-bg)',
            borderRight: isRtl ? 'none' : '1px solid var(--glass-border)',
            borderLeft: isRtl ? '1px solid var(--glass-border)' : 'none',
            height: 'calc(100vh - 70px)',
            padding: '2rem 1rem',
            position: 'sticky',
            top: '70px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
        }}>
            {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            padding: '0.8rem 1rem',
                            borderRadius: '8px',
                            color: isActive ? 'white' : '#a1a1aa',
                            background: isActive ? 'var(--primary)' : 'transparent',
                            fontWeight: isActive ? '600' : '400',
                            transition: 'all 0.2s ease',
                            textDecoration: 'none'
                        }}
                    >
                        {isRtl ? item.ar : item.name}
                    </Link>
                );
            })}
        </aside>
    );
}
