import { getServerSession } from "next-auth";
import GreetingBox from "./components/greeting"
import prisma from "@/libs/prisma/index"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LinkList from "./components/LinkList";

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

    return (
        <main className="container mx-auto">
            <GreetingBox />
            <p className="mt-4">Your link list</p>
            <LinkList data={data} />
        </main>
    )
}
export default UserDashboard