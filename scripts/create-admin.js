require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const prisma = new PrismaClient();

    const adminEmail = "mhd.abo.khaleel@gmail.com";
    const password = "AdminPassword2025"; // Change this after first login

    try {
        console.log(`Checking for existing user: ${adminEmail}...`);
        const existingUser = await prisma.user.findUnique({
            where: { email: adminEmail }
        });

        if (existingUser) {
            console.log("User already exists. Updating role to ADMIN...");
            await prisma.user.update({
                where: { email: adminEmail },
                data: { role: 'ADMIN' }
            });
            console.log("✅ User updated to ADMIN successfully!");
        } else {
            console.log("Creating new ADMIN user...");
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'ADMIN',
                    name: 'Admin'
                }
            });
            console.log(`✅ Admin account created successfully!`);
            console.log(`Email: ${adminEmail}`);
            console.log(`Temporary Password: ${password}`);
            console.log(`⚠️ Please log in and change your password immediately.`);
        }
    } catch (e) {
        console.error("❌ Failed to create admin:", e);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
