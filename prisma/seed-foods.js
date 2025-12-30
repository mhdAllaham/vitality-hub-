const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const foods = [
        {
            categoryEn: "Fruits",
            categoryAr: "فواكه",
            nameEn: "Blueberries",
            nameAr: "التوت الأزرق",
            benefitsEn: "Packed with antioxidants and supports brain health.",
            benefitsAr: "مليء بمضادات الأكسدة ويدعم صحة الدماغ."
        },
        {
            categoryEn: "Fruits",
            categoryAr: "فواكه",
            nameEn: "Avocado",
            nameAr: "أفوكادو",
            benefitsEn: "Rich in healthy monounsaturated fats and fiber.",
            benefitsAr: "غني بالدهون الصحية والألياف."
        },
        {
            categoryEn: "Vegetables",
            categoryAr: "خضروات",
            nameEn: "Spinach",
            nameAr: "سبانخ",
            benefitsEn: "High in iron, vitamins A and K.",
            benefitsAr: "غني بالحديد وفيتامينات أ و ك."
        },
        {
            categoryEn: "Vegetables",
            categoryAr: "خضروات",
            nameEn: "Broccoli",
            nameAr: "بروكلي",
            benefitsEn: "Great source of fiber and vitamin C.",
            benefitsAr: "مصدر ممتاز للألياف وفيتامين سي."
        },
        {
            categoryEn: "Herbs",
            categoryAr: "أعشاب",
            nameEn: "Turmeric",
            nameAr: "كركم",
            benefitsEn: "Powerful anti-inflammatory and antioxidant properties.",
            benefitsAr: "خصائص قوية مضادة للالتهابات ومضادة للأكسدة."
        },
        {
            categoryEn: "Herbs",
            categoryAr: "أعشاب",
            nameEn: "Ginger",
            nameAr: "زنجبيل",
            benefitsEn: "Aids digestion and reduces muscle pain.",
            benefitsAr: "يساعد في الهضم ويقلل من آلام العضلات."
        }
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
