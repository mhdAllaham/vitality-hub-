require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

async function importData() {
    const prisma = new PrismaClient();

    if (!fs.existsSync('local_data_backup.json')) {
        console.error("File local_data_backup.json not found!");
        return;
    }

    const data = JSON.parse(fs.readFileSync('local_data_backup.json', 'utf8'));

    try {
        console.log("Uploading data to Neon...");

        for (const item of data.tips) {
            const { id, ...rest } = item;
            await prisma.healthTip.create({ data: rest }).catch(() => { });
        }
        for (const item of data.exercises) {
            const { id, ...rest } = item;
            await prisma.exercise.create({ data: rest }).catch(() => { });
        }
        for (const item of data.meals) {
            const { id, ...rest } = item;
            await prisma.mealPlan.create({ data: rest }).catch(() => { });
        }
        for (const item of data.foods) {
            const { id, ...rest } = item;
            await prisma.healthyFood.create({ data: rest }).catch(() => { });
        }

        console.log("✅ Data imported to Neon successfully!");
    } catch (e) {
        console.error("Import failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

importData();
