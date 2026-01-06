require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    try {
        const exercisesCount = await prisma.exercise.count();
        const foodsCount = await prisma.healthyFood.count();
        const tipsCount = await prisma.healthTip.count();
        const mealsCount = await prisma.mealPlan.count();

        console.log("Database Stats:");
        console.log("- Exercises:", exercisesCount);
        console.log("- Healthy Foods:", foodsCount);
        console.log("- Health Tips:", tipsCount);
        console.log("- Meal Plans:", mealsCount);
    } catch (error) {
        console.error("Error connecting to database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

checkData();
