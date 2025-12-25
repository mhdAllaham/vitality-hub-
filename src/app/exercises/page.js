import { prisma } from '@/lib/prisma';
import Image from 'next/image';

export default async function ExercisesPage() {
    const exercises = await prisma.exercise.findMany();

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Workout Exercises</h1>
                <p style={{ color: '#a1a1aa' }}>Master your form and build strength with our curated exercise list.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '2rem',
                scrollBehavior: 'smooth'
            }}>
                {exercises.map((exercise) => (
                    <div key={exercise.id} className="card glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <Image
                                src={exercise.image || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400'}
                                alt={exercise.name}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.3rem' }}>{exercise.name}</h3>
                                <span className="glass" style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', borderRadius: '20px', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
                                    {exercise.category}
                                </span>
                            </div>
                            <p style={{ color: '#d1d1d6', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                {exercise.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
