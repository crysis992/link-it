import prisma from '@/libs/prisma/index'
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import jwt from "next-auth/jwt"


export async function POST(request: NextRequest) {
  const body = await request.json();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token != null) {
    console.log("User is logged in with id: ", token.id);
  } else {
    console.log("User is not logged in")
  }

  const url: string = body.url;
  const id: string = body.id;

  // Check if link has already been created, return if so
  const find = await prisma.target.findFirst({
    where: { target: url }
  })

  if (find !== null) {
    return NextResponse.json(find)
  }

  // Create a new entry if link has not been created yet

  if (token !== null) {

    const userId: string = token.id as string;
    console.log('Created link with user relation')
    try {
      const result = await prisma.target.create({
        data: {
          target: url,
          shortId: id,
          userId: userId
        }
      })

      return NextResponse.json(result, { status: 200 })
    } catch (error) {
      console.log('Failed to insert')
    }




  } else {
    // User is not logged in

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




}
