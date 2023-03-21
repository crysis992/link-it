import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from "@/libs/prisma/index"
import bcrypt from 'bcrypt'

interface IUser extends DefaultUser {
    role: string;
    id: string;
}

declare module "next-auth" {
    interface User extends IUser { }
    interface Session extends DefaultSession {
        user: User;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                console.log('RECEIVED LOGIN REQUEST')
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password are required');
                }

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Incorrect email or password');
                }
                const isMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                if (!isMatch) {
                    throw new Error('Incorrect email or password');
                }

                return {
                    id: user.id,
                    name: user.username,
                    picture: user.profileImage,
                    email: user.email,
                    role: user.role,
                }
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    debug: true,
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 7,
    },
    jwt: {
        maxAge: 60 * 60 * 24 * 7,
    },
    callbacks: {
        async session({ session, token }) {
            console.log('Called session callback')
            session.user = token as any;
            return session;
        },
        async jwt({ token, user }) {
            console.log('Called JWT callback')
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token
        }
    }
}

export default NextAuth(authOptions)