import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';


export async function DELETE(request: Request) {
    const body = await request.json();

    await prisma.treeEntry.delete({
        where: {
            id: body.id
        }
    })
    return NextResponse.json('ok');
}