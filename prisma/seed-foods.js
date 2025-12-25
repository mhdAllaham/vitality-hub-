const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const foods = [
        { category: "Fruits", name: "Blueberries", benefits: "Packed with antioxidants and supports brain health." },
        { category: "Fruits", name: "Avocado", benefits: "Rich in healthy monounsaturated fats and fiber." },
        { category: "Vegetables", name: "Spinach", benefits: "High in iron, vitamins A and K." },
        { category: "Vegetables", name: "Broccoli", benefits: "Great source of fiber and vitamin C." },
        { category: "Herbs", name: "Turmeric", benefits: "Powerful anti-inflammatory and antioxidant properties." },
        { category: "Herbs", name: "Ginger", benefits: "Aids digestion and reduces muscle pain." }
    ];

    for (const food of foods) {
        await prisma.healthyFood.create({ data: food });
    }

    console.log("Healthy foods seeded successfully!");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
