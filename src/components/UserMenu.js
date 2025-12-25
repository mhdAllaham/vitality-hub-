'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserMenu() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div className="auth-links">
                <Link href="/login" className="btn-primary">Login</Link>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#a1a1aa' }}>Hi, {session.user.name || 'User'}</span>
            <button onClick={() => signOut()} className="glass" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', color: 'white' }}>
                Logout
            </button>
        </div>
    );
}
