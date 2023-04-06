import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json({ error: 'Not logged in', message: 'Please login to perform this action' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email: token.email! } });
    const { username, password, oldpassword } = await request.json();
    if (!username) {
        return NextResponse.json('Invalid request', { status: 400 });
    }

    console.log(password.length, oldpassword.length);

    if (!oldpassword.length && !password.length) {
        try {
            await prisma.user.update({
                where: { email: token.email! },
                data: { username: username, name: username }
            })
            return NextResponse.json('Username updated successfully')
        } catch (error) {
            console.log(error);
            return NextResponse.json('Username is already taken', { status: 400 })
        }
    }

    if (!password || !oldpassword) {
        return NextResponse.json('Invalid request', { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const doesMatch = await bcrypt.compare(oldpassword, user?.hashedPassword!)

    if (!doesMatch) {
        console.log('Password mismatch')
        return NextResponse.json('Invalid password', { status: 400 });
    }

    try {
        await prisma.user.update({
            where: {
                email: token.email!
            },
            data: {
                name: username,
                username: username,
                hashedPassword: hashedPassword
            }
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json('Username is already taken', { status: 400 })
    }
    return NextResponse.json('Your account has been successfully updated.');
}