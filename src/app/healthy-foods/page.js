import { prisma } from '@/lib/prisma';

export default async function HealthyFoodsPage() {
    const foods = await prisma.healthyFood.findMany();

    const categories = ['Fruits', 'Vegetables', 'Herbs'];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Healthy Foods</h1>
                <p style={{ color: '#a1a1aa' }}>Explore nature&apos;s best ingredients and their incredible health benefits.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                {categories.map((cat) => (
                    <div key={cat}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem' }}>{cat}</h2>
                            <div style={{ flex: 1, height: '1px', background: 'var(--card-border)' }}></div>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                            gap: '2rem'
                        }}>
                            {foods.filter(f => f.category === cat).map((food) => (
                                <div key={food.id} className="card glass" style={{ borderTop: `4px solid ${cat === 'Fruits' ? 'var(--accent)' : cat === 'Vegetables' ? 'var(--primary)' : 'var(--secondary)'}` }}>
                                    <h3 style={{ marginBottom: '0.8rem' }}>{food.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#d1d1d6', lineHeight: '1.6' }}>
                                        {food.benefits}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
