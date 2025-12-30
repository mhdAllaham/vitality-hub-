const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const tips = [
        { contentEn: "Stay hydrated! Aim for at least 8 glasses of water a day.", contentAr: "حافظ على رطوبة جسمك! احرص على شرب 8 أكواب من الماء يومياً على الأقل." },
        { contentEn: "Consistency is key. Even a 15-minute workout counts.", contentAr: "الاستمرارية هي المفتاح. حتى التمرين لمدة 15 دقيقة له أهمية." },
        { contentEn: "Deep breathing can reduce stress levels instantly.", contentAr: "التنفس العميق يمكن أن يقلل من مستويات التوتر فوراً." },
        { contentEn: "Eat more green leafy vegetables for better energy.", contentAr: "تناول المزيد من الخضروات الورقية الخضراء للحصول على طاقة أفضل." },
        { contentEn: "Prioritize sleep—it's when your body recovers best.", contentAr: "أعطِ الأولوية للنوم - فجسمك يتعافى بشكل أفضل أثناء النوم." }
    ];

    for (const tip of tips) {
        await prisma.healthTip.create({ data: tip });
    }

    const exercises = [
        {
            nameEn: "Pushups",
            nameAr: "تمارين الضغط",
            descriptionEn: "Keep your back straight and lower your chest to the floor.",
            descriptionAr: "حافظ على استقامة ظهرك وأنزل صدرك نحو الأرض.",
            categoryEn: "Strength",
            categoryAr: "قوة",
            image: "https://images.unsplash.com/photo-1598971639058-aba003666d6d?q=80&w=400"
        },
        {
            nameEn: "Squats",
            nameAr: "تمارين القرفصاء",
            descriptionEn: "Sit back as if there's a chair, keeping your knees behind your toes.",
            descriptionAr: "اجلس للخلف كما لو كان هناك كرسي، مع الحفاظ على ركبتيك خلف أصابع قدميك.",
            categoryEn: "Lower Body",
            categoryAr: "الجزء السفلي",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400"
        }
    ];

    for (const ex of exercises) {
        await prisma.exercise.create({ data: ex });
    }

    const meals = [
        {
            type: "Breakfast",
            nameEn: "Oatmeal with Fruits",
            nameAr: "دقيق الشوفان مع الفواكه",
            descriptionEn: "High fiber oats with fresh berries and honey.",
            descriptionAr: "شوفان عالي الألياف مع التوت الطازج والعسل."
        },
        {
            type: "Lunch",
            nameEn: "Grilled Chicken Salad",
            nameAr: "سلطة الدجاج المشوي",
            descriptionEn: "Lean protein with mixed greens and olive oil dressing.",
            descriptionAr: "بروتين خفيف مع خضروات مشكلة وصلصة زيت الزيتون."
        },
        {
            type: "Dinner",
            nameEn: "Baked Salmon",
            nameAr: "سلمون مخبوز",
            descriptionEn: "Omega-3 rich salmon with roasted asparagus.",
            descriptionAr: "سلمون غني بأوميجا 3 مع هليون محمص."
        }
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
