const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function promote(email) {
    try {
        const user = await prisma.user.update({
            where: { email },
            data: { role: 'ADMIN' },
        });
        console.log(`Successfully promoted ${email} to ADMIN`);
    } catch (error) {
        console.error(`Error: User with email ${email} not found.`);
    } finally {
        await prisma.$disconnect();
    }
}

const email = process.argv[2];
if (!email) {
    console.log('Usage: node promote-admin.js <email>');
} else {
    promote(email);
}
