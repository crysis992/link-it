import { getServerSession } from "next-auth";
import GreetingBox from "./components/greeting"
import prisma from "@/libs/prisma/index"
import { headers } from 'next/headers';
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const revalidate = 0;

async function getAllLinks(user: string) {
    return await prisma.target.findMany({ where: { userId: user } });
}

async function UserDashboard() {
    const session = await getServerSession(authOptions);
    const data = await getAllLinks(session!.user.id);

    return (
        <main className="container mx-auto">
            <GreetingBox />
            <p className="mt-4">Your link list</p>

            <table className="min-w-full text-left text-sm font-light my-5">
                <thead className="border-b font-medium border-neutral-500">
                    <tr>
                        <th scope="col" className="px-6 py-4">Short</th>
                        <th scope="col" className="px-6 py-4">Destination</th>
                        <th scope="col" className="px-6 py-4">Visits</th>
                        <th scope="col" className="px-6 py-4">Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((link) => (
                        <tr key={link.id} className="border-b transition duration-200 ease-in-out hover:bg-neutral-100">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">https://link.crytec.net/l/{link.shortId}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{link.target}</td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">{link.visits}</td>
                            <td className="whitespace-nowrap px-6 py-4"><button className="bg-blue-400 hover:bg-blue-500">Manage</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    )
}
export default UserDashboard