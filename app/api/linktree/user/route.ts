import prisma from '@/libs/prisma/index'
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    const user = searchParams.get('id');

    if (!user) {
        return NextResponse.json('User not found', { status: 404 });
    }
    try {
        const result = await prisma.linkTree.findUnique({
            where: {
                ownerId: user
            },
            include: {
                entries: {
                    orderBy: {
                        order: "asc"
                    }
                }
            },
        })
        return NextResponse.json(result)
    } catch (err) {
        console.log(err)
    }
}