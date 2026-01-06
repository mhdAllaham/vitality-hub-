import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ProfileContent from '@/components/ProfileContent';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/login');
    }

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { healthData: true }
    });

    return (
        <ProfileContent initialData={JSON.parse(JSON.stringify(user?.healthData || {}))} />
    );
}
