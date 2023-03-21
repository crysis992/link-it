import prisma from "@/libs/prisma/index"
import RedirectFrame from "../RedirectFrame";
import { headers } from "next/headers"
import HeroSection from "@/components/HeroSection";

export type RedirectData = {
    target: string,
    shortId: string,
}

async function getTargetURL(id: string): Promise<RedirectData | 'error'> {
    const result = await prisma.target.findFirst({
        where: {
            shortId: id
        },
        select: {
            shortId: true,
            target: true,
        }
    })
    if (result === null) {
        return 'error'
    } else {
        return result;
    }
}

async function updateVisitCount(id: string): Promise<void> {
    try {
        await prisma.target.update({
            where: {
                shortId: id
            },
            data: {
                visits: { increment: 1 }
            }
        })
    } catch (error) {
        console.log(error);
    }
}

async function RedirectPage({ params }: { params: { id: string } }) {
    const data = await getTargetURL(params.id);

    if (data === 'error') {
        return <h2>Invalid ID</h2>
    }
    const headersList = headers();

    console.log(headersList.get('host'))
    console.log(headersList.get('connection'))
    console.log(headersList.get('user-agent'))
    console.log(headersList.get('user-referer'))

    updateVisitCount(data.shortId);

    return (
        <div className="flex justify-center">
            <HeroSection />
            <section className="flex-col">
                <h2 className="text-2xl font-semibold">Redirecting you to <a href={data.target} className="underline">{data.target}</a></h2>
                <RedirectFrame data={data} />
            </section>
        </div>
    )
}
export default RedirectPage