import prisma from '@/libs/prisma/index'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

export async function POST(request: Request) {

    const body = await request.json();

    const email: string = body.email;
    const username: string = body.username;
    const password: string = body.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    const find = await prisma.user.findFirst({
        where: {
            OR: [
                { email: email },
                { username: username }
            ]
        }
    })

    if (find !== null) {
        return NextResponse.json('Account already exists', { status: 409 });
    }

    try {
        const result = await prisma.user.create({
            data: {
                name: username,
                username: username,
                email: email,
                hashedPassword: hashedPassword,
            }
        })
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        console.log('Failed to insert')
        return NextResponse.json('Unable to insert into database, contact support', { status: 409 });
    }
}