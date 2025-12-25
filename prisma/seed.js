const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tips = [
        { content: "Stay hydrated! Aim for at least 8 glasses of water a day.", icon: "💧" },
        { content: "Consistency is key. Even a 15-minute workout counts.", icon: "🔥" },
        { content: "Deep breathing can reduce stress levels instantly.", icon: "🧘" },
        { content: "Eat more green leafy vegetables for better energy.", icon: "🥗" },
        { content: "Prioritize sleep—it's when your body recovers best.", icon: "😴" }
    ];

    for (const tip of tips) {
        await prisma.healthTip.create({ data: tip });
    }

    const exercises = [
        { name: "Pushups", description: "Keep your back straight and lower your chest to the floor.", category: "Strength", image: "https://images.unsplash.com/photo-1598971639058-aba003666d6d?q=80&w=400" },
        { name: "Squats", description: "Sit back as if there's a chair, keeping your knees behind your toes.", category: "Lower Body", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400" }
    ];

    for (const ex of exercises) {
        await prisma.exercise.create({ data: ex });
    }

    const meals = [
        { type: "Breakfast", name: "Oatmeal with Fruits", description: "High fiber oats with fresh berries and honey." },
        { type: "Lunch", name: "Grilled Chicken Salad", description: "Lean protein with mixed greens and olive oil dressing." },
        { type: "Dinner", name: "Baked Salmon", description: "Omega-3 rich salmon with roasted asparagus." }
    ];

    for (const meal of meals) {
        await prisma.mealPlan.create({ data: meal });
    }

    console.log("Database seeded successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
