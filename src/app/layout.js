import './globals.css';
import ClientSessionProvider from '@/components/SessionProvider';
import UserMenu from '@/components/UserMenu';
import Link from 'next/link';
import { LanguageProvider } from '@/context/LanguageContext';
import LanguageDirectionHandler from '@/components/LanguageDirectionHandler';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavLinks from '@/components/NavLinks';

export const metadata = {
  title: 'Vitality Hub - Premium Health & Fitness',
  description: 'Your personal health and fitness companion',
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
                <nav>
                  <NavLinks />
                </nav>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <LanguageSwitcher />
                  <UserMenu />
                </div>
              </header>
              <main>{children}</main>
            </ClientSessionProvider>
          </LanguageDirectionHandler>
        </LanguageProvider>
      </body>
    </html>
  );
}
