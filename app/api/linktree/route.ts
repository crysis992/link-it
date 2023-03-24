import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }
    const owner: string = token.id as string;


    const body = await request.json();
    const treeId = body.tree;
    const name = body.name;
    const destination = body.url;

    const treeOwner = await prisma.linkTree.findUnique({
        where: {
            ownerId: owner,
        },
        select: {
            ownerId: true,
            entries: true,
        }
    })

    if (treeOwner == null || treeOwner?.ownerId !== owner) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }

    if (treeOwner.entries.length >= 10) {
        return NextResponse.json('Limit reached', { status: 429 });
    }

    try {
        const record = await prisma.treeEntry.create({
            data: {
                treeId: treeId,
                name: name,
                destination: destination,
                order: 0,
            }
        })
        return NextResponse.json(record);
    } catch (error) {
        console.error(error)
        return NextResponse.json('Unable to create record', { status: 400 });
    }
}

/**
 * Create a new tree entry
 * @param request 
 * @returns 
 */
export async function PUT(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }
    const owner: string = token.id as string;
    try {
        const result = await prisma.linkTree.create({
            data: {
                ownerId: owner,
            }
        })
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}

export async function DELETE(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    if (token === null) {
        return NextResponse.json('Unauthorized', { status: 401 });
    }
    const owner: string = token.id as string;
    try {
        const result = await prisma.linkTree.delete({
            where: {
                ownerId: owner,
            }
        })
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(error, { status: 400 })
    }
}