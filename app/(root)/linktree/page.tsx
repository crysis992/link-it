import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from 'next-auth';
import prisma from "@/libs/prisma/index"
import CreateTreeButton from "./components/CreateTreeButton";
import LinkPreview from "./components/LinkPreview";

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

async function LinkTreeIndex() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <h2>Please login</h2>
    }
    const tree = await getLinkTree(session.user.id);

    if (!tree) {
        return (
            <div className="container mx-auto bg-slate-50 flex flex-col items-center gap-5">
                <h2>It looks like you are new. Create your link tree by clicking the button below</h2>
                <CreateTreeButton />
            </div>
        )
    }


    return (
        <div className="container mx-auto bg-slate-50 flex flex-col items-center gap-5">
            <LinkPreview user={session.user.id} username={session.user.name!} linkLimit={10} />
        </div>
    )
}
export default LinkTreeIndex