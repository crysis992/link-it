import GreetingBox from "./components/greeting"
import prisma from "@/libs/prisma/index"

export const revalidate = 0;

async function getAllLinks() {
    return await prisma.target.findMany();
}

async function getUsers() {
    return await prisma.user.findMany();
}

async function UserDashboard() {

    const data = await getAllLinks();
    const user = await getUsers();

    return (
        <main className="container mx-auto">
            <GreetingBox />
            <h2 className="text-bold text-2xl mb-3">[Work in Progress]</h2>
            <p className="my-4">Adminübersicht - Alle erstellen Links</p>
            {data.map((link) => <div key={link.id}>
                <div className="flex gap-5">
                    <div><span className="font-semibold text-gray-900">ID: </span>{link.id}</div>
                    <div><span className="font-semibold text-gray-900">Erstellt am: </span>{link.createdAt.toDateString()}</div>
                    <div><span className="font-semibold text-gray-900">Ziel: </span>{link.target}</div>
                    <div><span className="font-semibold text-gray-900">IP: </span> <small> (wird noch nicht gespeichert)</small></div>
                </div>
            </div>
            )}

            <hr className="my-10" />

            {user.map((ui) => <div key={ui.id}>
                <div className="flex gap-5">
                    <div><span className="font-semibold text-gray-900">ID: </span>{ui.name}</div>
                    <div><span className="font-semibold text-gray-900">Erstellt am: </span>{ui.createdAt.toDateString()}</div>
                    <div><span className="font-semibold text-gray-900">Mail: </span>{ui.email}</div>
                    <div><span className="font-semibold text-gray-900">Passwort: </span>{ui.hashedPassword}</div>
                    <div><span className="font-semibold text-gray-900">Username: </span>{ui.username}</div>
                    <div><span className="font-semibold text-gray-900">IP: </span> <small> (wird noch nicht gespeichert)</small></div>
                </div>
            </div>
            )}


        </main>
    )
}
export default UserDashboard