'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';
import { Home, Dumbbell, Utensils, Apple, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();
    const { language } = useLanguage();
    const t = translations[language];

    const navItems = [
        { href: '/', icon: Home, label: t.home },
        { href: '/exercises', icon: Dumbbell, label: t.exercises },
        { href: '/meal-plans', icon: Utensils, label: t.mealPlans },
        { href: '/healthy-foods', icon: Apple, label: t.healthyFoods },
        { href: '/profile', icon: User, label: t.profile },
    ];

    return (
        <nav className="mobile-bottom-nav">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Icon size={20} />
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
