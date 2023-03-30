import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('user');

    if (id === null) {
        return NextResponse.json({ error: 'Error fetching sensitive warning' }, { status: 500 })
    }

    try {
        const linkTree = await prisma.linkTree.findFirst({
            where: { ownerId: id },
            select: { sensitive: true, sensitiveType: true },
        });

        return NextResponse.json(linkTree);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error fetching sensitive warning' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('user');
    const mode = searchParams.get('mode');

    if (id === null) {
        return NextResponse.json({ error: 'Error fetching sensitive warning' }, { status: 500 })
    }

    const enable = mode === 'true';

    try {
        const linkTree = await prisma.linkTree.update({
            where: {
                ownerId: id,
            },
            data: {
                sensitive: enable,
                sensitiveType: mode
            }
        })
        return NextResponse.json(linkTree);
    } catch (error) {
        console.log('Error')
        console.error(error);
        return NextResponse.json({ error: 'Error fetching sensitive warning' }, { status: 500 })
    }


}