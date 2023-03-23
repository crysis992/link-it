import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

type RequestBody = {
    treeId: string;
    entries: {
        id: string;
        name: string;
        destination: string;
        order: number;
    }[];
};

export async function POST(request: Request) {
    const body = await request.json() as RequestBody;

    console.log('test')
    console.log(body)

    try {
        const tree = await prisma.linkTree.update({
            where: { id: body.treeId },
            data: {
                entries: {
                    updateMany: body.entries.map(({ id, name, destination, order }) => ({
                        where: { id },
                        data: { name, destination, order }
                    }))
                }
            },
            include: { entries: true }
        });


    } catch (error) {
        console.log(error)
    }
}