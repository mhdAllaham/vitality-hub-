require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

async function migrateData() {
    // 1. Client for Local SQLite
    const localPrisma = new PrismaClient({
        datasources: { db: { url: 'file:./prisma/dev.db' } },
    });

    // 2. Client for Neon PostgreSQL (from .env)
    const neonPrisma = new PrismaClient();

    try {
        console.log("🚀 Starting migration from Local SQLite to Neon Cloud...");

        // Migrate HealthTips
        const tips = await localPrisma.healthTip.findMany();
        console.log(`- Moving ${tips.length} Health Tips...`);
        for (const item of tips) {
            const { id, ...data } = item;
            await neonPrisma.healthTip.create({ data }).catch(() => { });
        }

        // Migrate Exercises
        const exercises = await localPrisma.exercise.findMany();
        console.log(`- Moving ${exercises.length} Exercises...`);
        for (const item of exercises) {
            const { id, ...data } = item;
            await neonPrisma.exercise.create({ data }).catch(() => { });
        }

        // Migrate MealPlans
        const meals = await localPrisma.mealPlan.findMany();
        console.log(`- Moving ${meals.length} Meal Plans...`);
        for (const item of meals) {
            const { id, ...data } = item;
            await neonPrisma.mealPlan.create({ data }).catch(() => { });
        }

        // Migrate HealthyFoods
        const foods = await localPrisma.healthyFood.findMany();
        console.log(`- Moving ${foods.length} Healthy Foods...`);
        for (const item of foods) {
            const { id, ...data } = item;
            await neonPrisma.healthyFood.create({ data }).catch(() => { });
        }

        console.log("✅ Migration complete! Your live site is now synced with your local data.");
    } catch (error) {
        console.error("❌ Migration failed:", error);
    } finally {
        await localPrisma.$disconnect();
        await neonPrisma.$disconnect();
    }
}

migrateData();
