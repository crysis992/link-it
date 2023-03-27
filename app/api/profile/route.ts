import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json({ error: 'Not logged in', message: 'Please login to perform this action' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
        where: { email: token.email! },
        include: { targets: true, userlinks: true }

    })
    return NextResponse.json(user);
}