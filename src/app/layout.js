import './globals.css';
import ClientSessionProvider from '@/components/SessionProvider';
import UserMenu from '@/components/UserMenu';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageDirectionHandler from '@/components/LanguageDirectionHandler';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavLinks from '@/components/NavLinks';
import BottomNav from '@/components/BottomNav';

export const metadata = {
  title: 'Vitality Hub - Premium Health & Fitness',
  description: 'Your personal health and fitness companion',
  manifest: '/manifest.json',
  themeColor: '#2ecc71',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vitality Hub',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageDirectionHandler>
            <ClientSessionProvider>
              <header>
                <Link href="/" className="logo">VITALITY HUB</Link>
                <nav className="desktop-nav">
                  <NavLinks />
                </nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <LanguageSwitcher />
                  <UserMenu />
                </div>
              </header>
              <main>{children}</main>
              <BottomNav />
            </ClientSessionProvider>
          </LanguageDirectionHandler>
        </LanguageProvider>
      </body>
    </html>
  );
}
