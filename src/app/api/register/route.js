import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { name, email, password, height, weight, gender, age } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Calculate BMI
        let bmi = null;
        let bmiClass = null;
        if (weight && height) {
            const hInMeters = height / 100;
            bmi = parseFloat((weight / (hInMeters * hInMeters)).toFixed(1));

            if (bmi < 18.5) bmiClass = 'Underweight';
            else if (bmi < 25) bmiClass = 'Normal weight';
            else if (bmi < 30) bmiClass = 'Overweight';
            else bmiClass = 'Obese';
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                healthData: {
                    create: {
                        weight: weight ? parseFloat(weight) : null,
                        height: height ? parseFloat(height) : null,
                        age: age ? parseInt(age) : null,
                        gender,
                        bmi,
                        bmiClass
                    }
                }
            }
        });

        return NextResponse.json({ message: 'User created successfully', userId: user.id }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
