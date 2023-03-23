import prisma from "@/libs/prisma/index"

async function getLinkTree(user: string) {

    const result = await prisma.linkTree.findUnique({
        where: {
            ownerId: user
        },
        include: {
            entries: {
                orderBy: {
                    order: "asc"
                }
            }
        },
    })
    return result;
}

async function getUserIdByName(name: string) {
    const result = await prisma.user.findUnique({
        where: {
            username: name
        },
        select: {
            id: true
        }
    })
    return result?.id;
}

async function UserLinkTree({ params }: { params: { id: string } }) {
    const username = await getUserIdByName(params.id);
    if (!username) { return null; }

    const tree = await getLinkTree(username);

    tree?.entries.sort()

    return (
        <main className="container mx-auto">
            <h1 className="text-3xl font-semibold text-center my-5">@{params.id}</h1>
            <section className="w-1/4 mx-auto mt-20">
                {
                    tree?.entries.map(entry => {
                        return (
                            <div className="bg-slate-100 p-2 mb-5 font-semibold text-center hover:bg-slate-400 transition" key={entry.id}>
                                <a href={entry.destination} ><p>{entry.name}</p></a>
                            </div>
                        )
                    })
                }
            </section>
        </main>
    )
}
export default UserLinkTree