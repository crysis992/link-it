import { getServerSession } from "next-auth";
import GreetingBox from "./components/greeting"
import prisma from "@/libs/prisma/index"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LinkList from "./components/LinkList";
import Link from "next/link";

export const revalidate = 0;

export type LinkData = {
    id: string;
    shortId: string;
    visits: number;
    target: string;
}

async function getAllLinks(user: string): Promise<LinkData[]> {
    return await prisma.target.findMany({
        where: { userId: user },
        select: {
            id: true,
            shortId: true,
            visits: true,
            target: true
        }
    });
}

async function UserDashboard() {
    const session = await getServerSession(authOptions);
    const data = await getAllLinks(session!.user.id);

    console.log(session!.user.id);

    return (
        <main className="container mx-auto relative">
            <Link href='/linktree'><button className="absolute right-0 top-1">Manage Linktree</button></Link>
            <Link href='/dashboard/profile/settings'><button className="absolute right-32 top-1">Settings</button></Link>
            <GreetingBox />
            <p className="mt-4">Your link list</p>
            <LinkList data={data} />
        </main>
    )
}
export default UserDashboard