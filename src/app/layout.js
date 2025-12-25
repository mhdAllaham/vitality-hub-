import './globals.css';
import ClientSessionProvider from '@/components/SessionProvider';
import UserMenu from '@/components/UserMenu';
import Link from 'next/link';

export const metadata = {
  title: 'Antigravity Fit - Premium Health & Fitness',
  description: 'Your personal health and fitness companion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <header>
            <Link href="/" className="logo">ANTIGRAVITY FIT</Link>
            <nav>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/exercises">Exercises</Link></li>
                <li><Link href="/meal-plans">Meal Plans</Link></li>
                <li><Link href="/healthy-foods">Healthy Foods</Link></li>
                <li><Link href="/profile">Profile</Link></li>
              </ul>
            </nav>
            <UserMenu />
          </header>
          <main>{children}</main>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
