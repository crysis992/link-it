import prisma from "@/libs/prisma/index"
import Script from "next/script"
import { IconType } from "react-icons";
import { RxCross1 } from "react-icons/rx";
import { getIconByName, getProfileURL } from '@/libs/socials';
import clsx from "clsx"

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

async function getUser(name: string) {
    const result = await prisma.user.findUnique({
        where: {
            username: name
        },
        select: {
            id: true,
            socials: true
        }
    })
    return result;
}

function SocialPlatformIcon(name: string) {
    const Icon: IconType = getIconByName(name);
    if (!Icon) return <RxCross1 />
    return <Icon size={30} />;
}

async function UserLinkTree({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);
    if (!user) { return null; }

    const tree = await getLinkTree(user.id);

    if (!tree) {
        return <h1>Sorry, could not find a linktree for this user</h1>
    }

    const theme = 'default';

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
            {/* <Script id="pageoutput" strategy="beforeInteractive">
                {`
                    var link = document.createElement('link');
                    link.href = "/themes/${theme}.css";
                    link.rel = "stylesheet";
                    document.head.appendChild(link);
                `}
            </Script> */}
            <main className={clsx('lt-container', `container-${theme}`)}>
                <h1 className={clsx('lt-username', `username-${theme}`)}>@{params.id}</h1>
                <section className={clsx('lt-buttons', `buttons-${theme}`)}>
                    {
                        tree.entries.map(entry => {
                            return (
                                <div className={clsx('lt-button', `button-${theme}`)} key={entry.id}>
                                    <a href={entry.destination} ><p>{entry.name}</p></a>
                                </div>
                            )
                        })
                    }
                </section>
                <div className={clsx('lt-icons', `icons-${theme}`)}>
                    {
                        user.socials.map((social) => (
                            <a key={social.provider} href={getProfileURL(social.provider, social.username)} target='_blank'>{SocialPlatformIcon(social.provider)}</a>
                        ))
                    }
                </div>
            </main>
        </>
    )
}
export default UserLinkTree