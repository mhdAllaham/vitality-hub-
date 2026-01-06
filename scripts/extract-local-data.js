const { PrismaClient } = require('@prisma/client');

async function extractData() {
    // Create a temporary client pointing to SQLite
    const sqliteClient = new PrismaClient({
        datasources: {
            db: {
                url: 'file:./prisma/dev.db',
            },
        },
    });

    try {
        const exercises = await sqliteClient.exercise.findMany();
        const mealPlans = await sqliteClient.mealPlan.findMany();
        const healthyFoods = await sqliteClient.healthyFood.findMany();
        const healthTips = await sqliteClient.healthTip.findMany();

        console.log(JSON.stringify({
            exercises,
            mealPlans,
            healthyFoods,
            healthTips
        }, null, 2));
    } catch (error) {
        console.error("Error extracting data:", error);
    } finally {
        await sqliteClient.$disconnect();
    }
}

extractData();
