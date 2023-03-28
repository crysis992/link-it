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

    const email = token.email!;



    const test = await prisma.user.findFirst({
        where: { email: email }, select: {
            socials: true
        }
    })


    return NextResponse.json(test?.socials);
}

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json({ error: 'Not logged in', message: 'Please login to perform this action' }, { status: 400 });
    }
    const email = token.email!;
    const body = await request.json();

    try {
        await prisma.user.update({
            where: { email: email },
            data: {
                socials: {
                    set: body,
                }
            }
        })
        return NextResponse.json('ok')
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}