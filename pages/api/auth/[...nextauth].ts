import NextAuth, { DefaultSession, DefaultUser } from "next-auth"
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

export default NextAuth({
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
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            console.log('User is logging in..')
            console.log(user)
            return true
        },
        async session({ session, token }) {
            const dbUser = await prisma.user.findFirst({
                where: { id: session.user.id },
            });
            if (!dbUser) return session;

            session.user = {
                id: dbUser.id,
                name: dbUser.username,
                image: dbUser.profileImage,
                email: dbUser.email,
                role: dbUser.role,
            }

            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user!.id;
                token.role = user.role;
            }
            return token
        }
    }
})