import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import ProfileForm from '@/components/ProfileForm';

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
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Personal Health Info</h1>
                <p style={{ color: '#a1a1aa' }}>Keep your health data up to date to track your fitness journey.</p>
            </header>

            <div className="card glass">
                <ProfileForm initialData={JSON.parse(JSON.stringify(user?.healthData || {}))} />
            </div>

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Understanding Your BMI</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem', color: '#a1a1aa' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)' }}>
                            <th style={{ padding: '0.8rem' }}>BMI Range</th>
                            <th style={{ padding: '0.8rem' }}>Classification</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                            <td style={{ padding: '0.8rem' }}>Below 18.5</td>
                            <td style={{ padding: '0.8rem' }}>Underweight</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--card-border)' }}>
                            <td style={{ padding: '0.8rem' }}>18.5 – 24.9</td>
                            <td style={{ padding: '0.8rem' }}>Normal weight</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--card-border)', color: 'var(--accent)' }}>
                            <td style={{ padding: '0.8rem' }}>25.0 – 29.9</td>
                            <td style={{ padding: '0.8rem' }}>Overweight</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--card-border)', color: '#ef4444' }}>
                            <td style={{ padding: '0.8rem' }}>30.0 and Above</td>
                            <td style={{ padding: '0.8rem' }}>Obese</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
