import { prisma } from '@/lib/prisma';

export default async function MealPlansPage() {
    const mealPlans = await prisma.mealPlan.findMany();

    const categories = ['Breakfast', 'Lunch', 'Dinner'];

    return (
        <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>Dynamic Meal Plans</h1>
                <p style={{ color: '#a1a1aa' }}>Fuel your body with these carefully curated nutritional guides.</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {categories.map((cat) => (
                    <div key={cat}>
                        <h2 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--secondary)', paddingLeft: '1rem' }}>{cat}</h2>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                            gap: '2rem'
                        }}>
                            {mealPlans.filter(p => p.type === cat).map((plan) => (
                                <div key={plan.id} className="card glass">
                                    <h3 style={{ marginBottom: '0.8rem', color: 'var(--secondary)' }}>{plan.name}</h3>
                                    <p style={{ fontSize: '0.9rem', color: '#d1d1d6', lineHeight: '1.6' }}>
                                        {plan.description}
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
