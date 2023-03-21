import prisma from '@/libs/prisma/index'
import { NextResponse } from 'next/server';


export async function POST(request: Request) {

  const body = await request.json();

  const url: string = body.url;
  const id: string = body.id;

  const find = await prisma.target.findFirst({
    where: { target: url }
  })

  if (find !== null) {
    return NextResponse.json(find)
  }

  try {
    const result = await prisma.target.create({
      data: {
        target: url,
        shortId: id,
      }
    })
    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.log('Failed to insert')
  }
}
