import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
    entry: string,
    title: string,
    url: string
};

export async function PUT(request: Request) {
    const body = await request.json() as RequestBody;

    console.log('test')
    console.log(body)

    try {
        const tree = await prisma.treeEntry.update({
            where: { id: body.entry },
            data: {
                name: body.title,
                destination: body.url
            }
        })
        return NextResponse.json(tree);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 400 })
    }
}