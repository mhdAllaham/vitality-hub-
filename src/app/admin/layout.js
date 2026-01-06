import AdminSidebar from '@/components/AdminSidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
        redirect('/');
    }

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)' }}>
            <AdminSidebar />
            <div style={{ flex: 1, padding: '2rem', background: 'rgba(255, 255, 255, 0.01)' }}>
                {children}
            </div>
        </div>
    );
}
