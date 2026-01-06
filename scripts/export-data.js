require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function exportData() {
    // Force absolute path for SQLite to avoid "Unable to open database" errors
    const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
    const dbUrl = `file:${dbPath}`;

    console.log("🚀 Absolute DB Path:", dbPath);

    if (!fs.existsSync(dbPath)) {
        console.error("❌ Database file NOT found!");
        return;
    }

    // Initialize Prisma with the explicit absolute URL
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: dbUrl,
            },
        },
    });

    try {
        console.log("📡 Connecting to local SQLite database...");

        const data = {
            tips: await prisma.healthTip.findMany(),
            exercises: await prisma.exercise.findMany(),
            meals: await prisma.mealPlan.findMany(),
            foods: await prisma.healthyFood.findMany()
        };

        console.log(`- Found ${data.tips.length} Health Tips`);
        console.log(`- Found ${data.exercises.length} Exercises`);
        console.log(`- Found ${data.meals.length} Meal Plans`);
        console.log(`- Found ${data.foods.length} Healthy Foods`);

        fs.writeFileSync('local_data_backup.json', JSON.stringify(data, null, 2));
        console.log("\n✅ Data exported successfully to local_data_backup.json");
    } catch (e) {
        console.error("❌ Export failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

exportData();
